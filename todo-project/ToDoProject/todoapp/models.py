from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from rest_framework_simplejwt.tokens import RefreshToken


# User manager for custom user model
class UserManager(BaseUserManager):

    def create_user(self, first_name, last_name, email, password=None):
        if first_name is None:
            raise TypeError("Provide first name")
        if last_name is None:
            raise TypeError("Provide last name")
        if email is None:
            raise TypeError("Provide email")

        user = self.model(first_name=first_name, last_name=last_name,email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, first_name, last_name, email, password=None):
        if password is None:
            raise TypeError("Provide password")

        user = self.create_user(first_name,last_name,email,password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

# Custom user model
class User(AbstractBaseUser,PermissionsMixin):
    
    first_name = models.CharField(max_length=255, db_index=True)
    last_name = models.CharField(max_length=255, db_index=True)
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

# Task Model
class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='todo')
    email = models.ForeignKey(User, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.title