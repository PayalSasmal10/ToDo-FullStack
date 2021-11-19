from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.db.models import fields
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.exceptions import TokenError
from .models import Task, User
from django.contrib import auth
from rest_framework_simplejwt.tokens import RefreshToken


# Task fetching serializer
class TaskGetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ['pk','title', 'description', 'status', 'user']


#Task create serializer
class TaskCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ['title', 'description', 'status', 'user']
        
#Task update serializer
class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'status']



# Registration Serializer
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
            raise serializers.ValidationError('The first name should be alphanumeric')
        if not last_name.isalnum():
            raise serializers.ValidationError('The last name should be alphanumeric')

        return attrs

    def create(self, validated_data):
        
        user = User.objects.create_user(**validated_data)

        return user

# Login Serializer
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=2)
    password = serializers.CharField(max_length=255, write_only=True)
    tokens = serializers.SerializerMethodField()
    first_name = serializers.CharField(max_length=255, read_only=True)
    last_name = serializers.CharField(max_length=255, read_only=True)

    def get_tokens(self, obj):
        user = User.objects.get(email=obj['email'])
        print(user.tokens())
        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }
        
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

# Logout Serializer
class LogoutSerializer(serializers.ModelSerializer):

    refresh = serializers.CharField()

    default_error_messages = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):

        self.token = attrs['refresh']

        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken (self.token).blacklist()

        except TokenError:
            self.fail("bad_token")

# Reset Password Email API Serializer
class RequestPasswordResetEmailSerializer(serializers.Serializer):
    
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ['email']


# Setting New Password Token Serializer
class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1,write_only=True)
    uidbase64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidbase64']

    def validate(self, attrs):

        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidbase64 = attrs.get('uidbase64')

            id = force_str(urlsafe_base64_decode(uidbase64))
            user = User.objects.get(id =id)

            if not PasswordResetTokenGenerator().check_token(user,token):
                raise AuthenticationFailed('Reset link is invalid', 401)
            
            user.set_password(password)
            user.save()
        except Exception as e:
            raise AuthenticationFailed('Reset link is invalid', 401)

        return super().validate(attrs)
    

#Change password serializer
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    
    class Meta:
        fields = ['old_password', 'new_password']