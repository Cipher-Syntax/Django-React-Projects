from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics #type: ignore
from rest_framework.permissions import IsAuthenticated, AllowAny #type: ignore
from .serializers import UserSerializer
from .models import Note

# Create your views here.
class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
