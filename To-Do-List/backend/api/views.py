from django.shortcuts import render
from rest_framework import viewsets #type: ignore
from .models import ToDoList
from .serializers import ToDoListSerializer

# Create your views here.
class ToDoListViewSet(viewsets.ModelViewSet):
    queryset = ToDoList.objects.all().order_by('-created_at')
    serializer_class = ToDoListSerializer

