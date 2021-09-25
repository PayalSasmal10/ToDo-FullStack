from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from .models import Task, User
from django.contrib import auth

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'first_name', 'last_name', 'email')

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(max_length=255, write_only=True)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

    def validate(self, attrs):
        email = attrs.get('email', '')
        first_name = attrs.get('first_name', '')
        last_name = attrs.get('last_name', '')
        
        if not first_name.isalnum():
            raise serializers.ValidationError('The first name shout be alphanumeric')
        if not last_name.isalnum():
            raise serializers.ValidationError('The last name shout be alphanumeric')
        
        return attrs

    def create(self, validated_data):
        
        user = User.objects.create_user(**validated_data)

        return user


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=2)
    password = serializers.CharField(max_length=255, write_only=True)
    tokens = serializers.CharField(max_length=255, read_only=True)
    first_name = serializers.CharField(max_length=255, read_only=True)
    last_name = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email','password','first_name','last_name','tokens']

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        user = auth.authenticate(email=email,password=password)

        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
       
        
        return {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'tokens': user.tokens
        }

        return super().validate(attrs)
