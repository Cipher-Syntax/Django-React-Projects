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
import base64


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
# class OrderItemViewSet(viewsets.ModelViewSet):
#     queryset = OrderItem.objects.all()
#     serializer_class = OrderItemSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def get_queryset(self):
#         user = self.request.user
#         queryset = OrderItem.objects.filter(order__user=user)
#         return queryset
# ---------- ORDER ITEM ----------
class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        queryset = OrderItem.objects.filter(order__user=user)
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()  # get the OrderItem
        order = instance.order        # get the parent Order
        self.perform_destroy(instance)  # delete the OrderItem

        # If the order has no more items, delete the order as well
        if order.items.count() == 0:
            order.delete()

        return Response(status=204)



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
        status_filter = self.request.query_params.get('status')

        queryset = Order.objects.filter(user=user)

        if status_filter:
            queryset = queryset.filter(status=status_filter)

        return queryset.order_by('-created_at')

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


# ---------- ADD TO CART ----------
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def add_to_cart(request):
#     product_id = request.data.get('product_id')
#     quantity = int(request.data.get('quantity', 1))

#     product = get_object_or_404(Product, id=product_id)

#     order, created = Order.objects.get_or_create(
#         user=request.user,
#         status='Pending',
#         defaults={'total_price': 0}
#     )

#     order_item, created_item = OrderItem.objects.get_or_create(
#         order=order,
#         product=product,
#         defaults={'quantity': quantity, 'price': product.price}
#     )
#     # order_item = OrderItem.objects.create(
#     #     order=order,
#     #     product=product,
#     #     quantity=quantity,
#     #     price=product.price
#     # )


#     if not created_item:
#         order_item.quantity += quantity
#         order_item.save()

#     order.total_price = sum(item.quantity * item.price for item in order.items.all())
#     order.save()

#     return Response({
#         'message': 'Product added to cart successfully!',
#         'order_id': order.id,
#         'total_price': order.total_price
#     })
# ---------- ADD TO CART ----------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))

    product = get_object_or_404(Product, id=product_id)

    # Safely get the first pending order, or create a new one if none exist
    order = Order.objects.filter(user=request.user, status='Pending').first()
    if not order:
        order = Order.objects.create(user=request.user, status='Pending', total_price=0)

    # Get or create the OrderItem
    order_item, created_item = OrderItem.objects.get_or_create(
        order=order,
        product=product,
        defaults={'quantity': quantity, 'price': product.price}
    )

    # If item already exists, just increase the quantity
    if not created_item:
        order_item.quantity += quantity
        order_item.save()

    # Update the total price of the order
    order.total_price = sum(item.quantity * item.price for item in order.items.all())
    order.save()

    return Response({
        'message': 'Product added to cart successfully!',
        'order_id': order.id,
        'total_price': order.total_price
    })



# ----------  COUNT CART ----------
@api_view(['GET'])
def cart_item_count(request):
    user = request.user
    if not user.is_authenticated:
        return Response({'count': 0})

    total_count = OrderItem.objects.filter(order__user=user, order__status='Pending').count()
    return Response({'count': total_count})

# # ---------- PAYMENT INTENT ----------
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_payment_intent(request):
#     print("Request data:", request.data)
#     print("User:", request.user)

#     user = request.user
#     selected_item_ids = request.data.get('selected_item_ids', [])
    
    
#     if not selected_item_ids:
#         return Response({'error': 'No items selected'}, status=400)

#     items = OrderItem.objects.filter(id__in=selected_item_ids, order__user=user, order__status='Pending')
#     if not items.exists():
#         return Response({'error': 'Selected items not found'}, status=404)

#     temp_order = Order.objects.create(user=user, status='Pending', total_price=0)
#     for item in items:
#         item.order = temp_order
#         item.save()

#     temp_order.total_price = sum(item.quantity * item.price for item in items)
#     temp_order.save()

#     # temp_order = Order.objects.create(user=user, status='Pending', total_price=0)
#     # for item in items:
#     #     OrderItem.objects.create(
#     #         order=temp_order,
#     #         product=item.product,
#     #         quantity=item.quantity,
#     #         price=item.price
#     #     )


#     amount = int(temp_order.total_price * 100)
#     secret_key = settings.PAYMONGO_SECRET_KEY
#     auth_token = base64.b64encode(f"{secret_key}:".encode()).decode()
#     headers = {
#         'Authorization': f'Basic {auth_token}',
#         'Content-Type': 'application/json',
#         'Accept': 'application/json',
#     }

#     payload = {
#         "data": {
#             "attributes": {
#                 "amount": amount,
#                 "payment_method_allowed": ["gcash"],
#                 "currency": "PHP",
#                 "description": f"Order #{temp_order.id}",
#             }
#         }
#     }

#     print("=== DEBUG: Creating PayMongo Payment Intent ===")
#     print("Temp order total_price:", temp_order.total_price)
#     print("Amount sent to PayMongo (in cents):", amount)
#     print("Payload being sent to PayMongo:", json.dumps(payload, indent=2))

#     amount = int(temp_order.total_price * 100)

#     # Minimum amount check before calling PayMongo
#     if amount < 2000:
#         return Response({'error': 'Minimum GCash payment is ₱20.00'}, status=400)

#     response = requests.post(f"{settings.PAYMONGO_BASE_URL}/payment_intents", headers=headers, json=payload)
#     data = response.json()

#     if "data" not in data:
#         return Response({'error': 'Failed to create payment intent', 'details': data}, status=400)

#     # Payment method
#     pm_response = requests.post(
#         f"{settings.PAYMONGO_BASE_URL}/payment_methods",
#         headers=headers,
#         json={"data": {"attributes": {"type": "gcash"}}}
#     )
#     pm_data = pm_response.json()
#     payment_method_id = pm_data["data"]["id"]

#     # Attach payment
#     attach_response = requests.post(
#         f"{settings.PAYMONGO_BASE_URL}/payment_intents/{data['data']['id']}/attach",
#         headers=headers,
#         json={
#             "data": {
#                 "attributes": {
#                     "payment_method": payment_method_id,
#                     "return_url": "http://localhost:5173/payment-success"
#                 }
#             }
#         }
#     )
#     attach_data = attach_response.json()

#     checkout_url = attach_data.get("data", {}).get("attributes", {}).get("next_action", {}) \
#         .get("redirect", {}).get("url")
#     if not checkout_url:
#         return Response({'error': 'Failed to get checkout URL', 'details': attach_data}, status=500)

#     # Save payment
#     Payment.objects.create(
#         order=temp_order,
#         paymongo_payment_id=data['data']['id'],
#         amount=temp_order.total_price,
#         status='Pending',
#         checkout_url=checkout_url
#     )

#     return Response({
#         "payment_intent_id": data['data']['id'],
#         "client_key": data['data']['attributes']['client_key'],
#         "amount": temp_order.total_price,
#         "checkout_url": checkout_url
#     })

# ---------- PAYMENT INTENT ----------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment_intent(request):
    user = request.user
    selected_item_ids = request.data.get('selected_item_ids', [])

    if not selected_item_ids:
        return Response({'error': 'No items selected'}, status=400)

    # Get the selected order items
    items = OrderItem.objects.filter(
        id__in=selected_item_ids,
        order__user=user,
        order__status='Pending'
    )

    if not items.exists():
        return Response({'error': 'Selected items not found'}, status=404)

    # Create a temporary order for payment
    temp_order = Order.objects.create(user=user, status='Pending', total_price=0)
    for item in items:
        item.order = temp_order
        item.save()

    temp_order.total_price = sum(item.quantity * item.price for item in items)
    temp_order.save()

    # Convert to cents for PayMongo
    amount = int(temp_order.total_price * 100)

    # Minimum GCash payment check (₱20 = 2000 cents)
    if amount < 2000:
        return Response({'error': 'Minimum GCash payment is ₱20.00'}, status=400)

    # Prepare PayMongo headers
    secret_key = settings.PAYMONGO_SECRET_KEY
    auth_token = base64.b64encode(f"{secret_key}:".encode()).decode()
    headers = {
        'Authorization': f'Basic {auth_token}',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    # Payload for payment intent
    payload = {
        "data": {
            "attributes": {
                "amount": amount,
                "payment_method_allowed": ["gcash"],
                "currency": "PHP",
                "description": f"Order #{temp_order.id}",
            }
        }
    }

    # Create payment intent
    response = requests.post(f"{settings.PAYMONGO_BASE_URL}/payment_intents", headers=headers, json=payload)
    # print(response.status_code, response.text)
    print("PayMongo Response:", response.status_code, response.text)
    data = response.json()

    if "data" not in data:
        return Response({'error': 'Failed to create payment intent', 'details': data}, status=400)

    payment_intent_id = data['data']['id']
    client_key = data['data']['attributes']['client_key']

    # Create payment method
    pm_response = requests.post(
        f"{settings.PAYMONGO_BASE_URL}/payment_methods",
        headers=headers,
        json={"data": {"attributes": {"type": "gcash"}}}
    )
    pm_data = pm_response.json()
    payment_method_id = pm_data.get("data", {}).get("id")
    if not payment_method_id:
        return Response({'error': 'Failed to create payment method', 'details': pm_data}, status=400)

    # Attach payment method with dynamic return URL
    attach_response = requests.post(
        f"{settings.PAYMONGO_BASE_URL}/payment_intents/{payment_intent_id}/attach",
        headers=headers,
        json={
            "data": {
                "attributes": {
                    "payment_method": payment_method_id,
                    "return_url": settings.PAYMONGO_RETURN_URL
                }
            }
        }
    )
    attach_data = attach_response.json()

    checkout_url = attach_data.get("data", {}).get("attributes", {}).get("next_action", {}).get("redirect", {}).get("url")
    if not checkout_url:
        return Response({'error': 'Failed to get checkout URL', 'details': attach_data}, status=500)

    # Save the payment record
    Payment.objects.create(
        order=temp_order,
        paymongo_payment_id=payment_intent_id,
        amount=temp_order.total_price,
        status='Pending',
        checkout_url=checkout_url
    )

    return Response({
        "payment_intent_id": payment_intent_id,
        "client_key": client_key,
        "amount": temp_order.total_price,
        "checkout_url": checkout_url
    })


# ---------- PAYMENT WEBHOOK ----------
@csrf_exempt
def paymongo_webhook(request):
    if request.method != "POST":
        return JsonResponse({'error': 'Invalid request method'}, status=405)

    try:
        payload = json.loads(request.body)
        event_type = payload['data']['attributes']['type']
        payment_id = payload['data']['attributes']['data']['attributes']['payment_intent_id']

        if event_type != 'payment.paid':
            return JsonResponse({'message': 'Event ignored'}, status=200)

        payment = Payment.objects.filter(paymongo_payment_id=payment_id).first()
        if not payment:
            return JsonResponse({'error': f'Payment not found for ID: {payment_id}'}, status=404)

        if payment.status != 'Paid':
            payment.status = 'Paid'
            payment.save()
            if payment.order:
                payment.order.status = 'Completed'
                payment.order.save()

        return JsonResponse({'message': 'Payment successfully processed'}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
