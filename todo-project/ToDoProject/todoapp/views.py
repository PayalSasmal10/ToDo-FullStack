from django.http.response import Http404
from .models import Task, User
from rest_framework.response import Response
from todoapp.serializers import LoginSerializer, TaskCreateSerializer, TaskUpdateSerializer, RegisterSerializer, LogoutSerializer, TaskGetSerializer, RequestPasswordResetEmailSerializer
from rest_framework.generics import GenericAPIView
from rest_framework import serializers, status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str, smart_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util


# Sign up API
# Url: https://<your-domain>/app/signup
# Headers: Authorization: JWT <token>
class SignUpView(GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self,request):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


# Login APi
# Url: https://<your-domain>/app/signin
# Headers: Authorization: JWT <token>
class SignInView(GenericAPIView):


    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Logout API
# Url: https://<your-domain>/app/logout
# Headers: Authorization: JWT <token>
class LogOutView(GenericAPIView):
    
    serializer_class = LogoutSerializer

    permission_classes = (permissions.IsAuthenticated,)

    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response("Successfully Logout", status=status.HTTP_204_NO_CONTENT)

# CRUD operation without Primary key
# Url: https://<your-domain>/app/task
# Headers: Authorization: JWT <token>
class taskList(GenericAPIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
                
        user = self.request.user
        print(user)
        tasks = Task.objects.filter(user=user)
        
        serializer = TaskGetSerializer(tasks, many= True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        data['user'] = request.user.pk
        serializer = TaskCreateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


# CRUD operation based on the primary key
# Url: https://<your-domain>/app/task/<int:pk>
# Headers: Authorization: JWT <token>
class taskPrimarykeybased(GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
            
    def put(self, request, pk):
        user = self.request.user
        tasks = Task.objects.get(id=pk)
        if tasks.user != user:
            return Response({'response': "You don't have permission to edit that."})


        serializer = TaskUpdateSerializer(tasks, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        tasks = Task.objects.get(id=pk)
        user = request.user

        if tasks.user != user:
            return Response({'response': "You don't have permission to edit that."})

        tasks.delete()
        return Response("Task deleted successfully", status=status.HTTP_200_OK)


class RequestPasswordResetEmail(GenericAPIView):

    serializer_class = RequestPasswordResetEmailSerializer

    print("I am inside password view")

    def post(self, request):

        serializer = self.serializer_class(data=request.data)

        print(serializer)

        email = request.data['email']

        print(email)


        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            print(user.id)
            uidbase64 = urlsafe_base64_encode(smart_bytes(user.id))
            print("uidbase64",uidbase64)
            token = PasswordResetTokenGenerator().make_token(user)
            print("token",token)
            current_site = get_current_site(request=request).domain
            print("current_site",current_site)
            relativeLink = reverse('password-reset-confirmation', kwargs={'uidbase64': uidbase64, 'token': token})
            print("relativeLink", relativeLink)
            redirect_url = request.data.get('redirect_url', '')
            absurl = 'http://'+current_site+ relativeLink
            print('absurl',absurl)
            email_body = 'Hello, \n Use link below to reset your password \n' + absurl + "?redirect_url="+redirect_url
            print('email_body',email_body)
            data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Reset your password'}
            print('data:',data)
            Util.send_email(data)
          
            return Response({"success:", "We have sent you a link to reset your password"}, status=status.HTTP_200_OK)
        
        return Response({"Failed:", "User does not exists"}, status=status.HTTP_404_NOT_FOUND)
        


class PasswordCheckTokenAPI(GenericAPIView):

    def get(self, request, uidbase64, token):
        pass


