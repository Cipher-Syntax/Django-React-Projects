from django.shortcuts import render
from rest_framework import viewsets, permissions, generics #type: ignore
from .models import Expense
from .serializers import UserSerializer, ExpenseSerializer

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
        start_date = self.request.query_params('start_date')
        end_date = self.request.query_params('end_date')
        
        if start_date and end_date:
            queryset = Expense.objects.filter(start_date__gte=start_date, end_date__lte=end_date)
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)