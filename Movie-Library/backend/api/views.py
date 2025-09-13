from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, generics #type: ignore
from .models import Genre, Movie
from .serializers import UserSerializer, GenreSerializer, MovieSerializer

# Create your views here.
class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    
class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-created_at')
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        genre_id = self.request.query_params.get('genre_id')
        
        if genre_id:
            return Movie.objects.filter(genres__id=genre_id).order_by('-created_at')
        
        return Movie.objects.all().order_by('-created_at')