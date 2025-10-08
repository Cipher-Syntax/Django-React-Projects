from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, generics, permissions  # type: ignore
from .models import Category, Product, Order, OrderItem, DailyDeal, Payment
from .serializers import UserSerializer, ProductSerializer, OrderSerializer, OrderItemSerializer, DailyDealSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, SAFE_METHODS, BasePermission  # type: ignore
from datetime import date
from rest_framework.decorators import api_view, permission_classes  # type: ignore
from rest_framework.response import Response  # type: ignore
import random
import requests
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
import json


# ---------- USER ----------
class CreateUser(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


# ---------- PRODUCT ----------
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]


# ---------- ORDER ITEM ----------
class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        queryset = OrderItem.objects.filter(order__user=user)
        return queryset


# ---------- PERMISSION ----------
class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user or request.user.is_staff


# ---------- ORDER ----------
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        queryset = Order.objects.filter(user=user).order_by('-created_at')
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ---------- DAILY DEAL ----------
@api_view(['GET'])
def daily_deal(request):
    today = date.today()
    daily_deal, created = DailyDeal.objects.get_or_create(date=today)

    # Only create new deals if none exist yet
    if created or daily_deal.products.count() == 0:
        products = list(Product.objects.all())
        if len(products) > 5:
            products = random.sample(products, 5)
        daily_deal.products.set(products)
        daily_deal.save()

    serializer = DailyDealSerializer(daily_deal, context={'request': request})
    return Response(serializer.data)


# ---------- 🛒 ADD TO CART ----------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    """Handles adding a product to the user's cart (Pending order)."""
    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))

    product = get_object_or_404(Product, id=product_id)

    # 1. Find or create a pending order for this user
    order, created = Order.objects.get_or_create(
        user=request.user,
        status='Pending',
        defaults={'total_price': 0}
    )

    # 2. Check if product already exists in the cart
    order_item, created_item = OrderItem.objects.get_or_create(
        order=order,
        product=product,
        defaults={'quantity': quantity, 'price': product.price}
    )

    # 3. Update quantity if item already exists
    if not created_item:
        order_item.quantity += quantity
        order_item.save()

    # 4. Update total price
    order.total_price = sum(item.quantity * item.price for item in order.items.all())
    order.save()

    return Response({
        'message': 'Product added to cart successfully!',
        'order_id': order.id,
        'total_price': order.total_price
    })

@api_view(['GET'])
def cart_item_count(request):
    user = request.user
    if not user.is_authenticated:
        return Response({'count': 0 })
    
    total_count = OrderItem.objects.filter(order__user=user).count()
    return Response({'count': total_count})
