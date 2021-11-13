from django.http import response
from .models import Task
from rest_framework.response import Response
from todoapp.serializers import LoginSerializer, TaskCreateSerializer, TaskUpdateSerializer, RegisterSerializer, LogoutSerializer, TaskGetSerializer
from rest_framework.generics import GenericAPIView
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication


# Sign up API
# Url: https://<your-domain>/api/signup
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
# Url: https://<your-domain>/api/signin
# Headers: Authorization: JWT <token>
class SignInView(GenericAPIView):


    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


#Logout API
# Url: https://<your-domain>/api/logout
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
# Url: https://<your-domain>/api/task
# Headers: Authorization: JWT <token>
class taskList(GenericAPIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        
        #serializer_class = TaskGetSerializer
        
        user = self.request.user
        print(user)
        tasks = Task.objects.filter(user=user)
        
        #print(tasks.user)
        # if task_test.user != user:
        #     return Response({'response': "You don't have permission to edit that."})
        
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
# Url: https://<your-domain>/api/task/<int:pk>
# Headers: Authorization: JWT <token>
class taskPrimarykeybased(GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    # def get(self, request):

    #     user = self.request.user
    #     print(user)
    #     tasks = Task.objects.filter(user=user)
        
    #     #print(tasks.user)
    #     # if task_test.user != user:
    #     #     return Response({'response': "You don't have permission to edit that."})
        
    #     serializer = TaskGetSerializer(tasks, many= True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)
        
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
