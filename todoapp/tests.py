
from django.contrib.auth.models import User
from django.http import response
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from .serializers import RegisterSerializer
from .models import User, Task

# Create your tests here.

class RegistrationTestAPI(APITestCase):

    def test_registration(self):
        data = {"first_name": "testcase", "last_name": "lastname", "email":"testcase@todoapp.com", "password": "testcase"}

        response = self.client.post("/app/signup", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
