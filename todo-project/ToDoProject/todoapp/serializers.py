from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.exceptions import TokenError
from .models import Task, User
from django.contrib import auth
from rest_framework_simplejwt.tokens import RefreshToken


class TaskGetSerializer(serializers.ModelSerializer):

    #email = serializers.SerializerMethodField('get_userid_from_user')

    class Meta:
        model = Task
        fields = ['pk','title', 'description', 'status', 'user']

    # def get_userid_from_user(self, tasks):
    #     email = tasks.user.email
    #     print("inside serializer", email)
    #     return email

#Task Serializer create serializer
class TaskCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ['title', 'description', 'status', 'user']
        

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
