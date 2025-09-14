from rest_framework import serializers #type: ignore
from django.contrib.auth.models import User
from .models import Genre, Movie

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('That username is already taken.')
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']
        
class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(read_only=True, many=True)
    genre_id = serializers.PrimaryKeyRelatedField(
        many=True, queryset = Genre.objects.all(), source='genres', write_only=True
    )
    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'genres', 'image', 'genre_id']
        