from rest_framework import serializers #type: ignore
from .models import Expense
from django.contrib.auth.models import User
import bleach

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('That username is already taken')
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['user', 'title', 'amount', 'category', 'start_date', 'end_date', 'created_at']
        read_only_fields = ['user']
        
        def validate_title(self, value):
            return bleach.clean(value, tags=[], strip=True)  # strips scripts/tags
