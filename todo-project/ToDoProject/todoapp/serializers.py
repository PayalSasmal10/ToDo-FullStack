from rest_framework import serializers
from .models import Task, User

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

    def create(self, validated_data):
        print("calling create user")
        user = User.objects.create_user(**validated_data)
        return user

# class LoginSeralizer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)
#     email = serializers.CharField(max_length=255)

#     class Meta:
#         model = User
#         fields = ['email', 'username', 'password']