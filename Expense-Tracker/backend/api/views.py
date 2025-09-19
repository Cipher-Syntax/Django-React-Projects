from django.shortcuts import render
from rest_framework import viewsets, permissions, generics #type: ignore
from .models import Expense
from .serializers import UserSerializer, ExpenseSerializer
from django.utils.dateparse import parse_date

# Create your views here.
class CreateUser(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Expense.objects.all().order_by('-created_at')
    
    def get_queryset(self):
        user = self.request.user
        queryset = Expense.objects.filter(user=user)

        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        category = self.request.query_params.get('category')

        if start_date:
            start = parse_date(start_date)
            queryset = queryset.filter(start_date__gte=start)

        if end_date:
            end = parse_date(end_date)
            queryset = queryset.filter(end_date__lte=end)

        if category:
            queryset = queryset.filter(category=category)

        return queryset

    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)