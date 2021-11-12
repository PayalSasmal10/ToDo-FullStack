from django.http import response
from .models import Task
from rest_framework.response import Response
from todoapp.serializers import LoginSerializer, TaskSerializer, TaskUpdateSerializer, RegisterSerializer, LogoutSerializer
from rest_framework.generics import GenericAPIView
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication


#Sign up API
class SignUpView(GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self,request):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


# # Login APi
class SignInView(GenericAPIView):


    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


#Logout API
class LogOutView(GenericAPIView):
    
    serializer_class = LogoutSerializer

    permission_classes = (permissions.IsAuthenticated,)

    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response("Successfully Logout", status=status.HTTP_204_NO_CONTENT)

# CRUD operation without Primary key
class taskList(GenericAPIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
   
        tasks = Task.objects.all()
        user = request.user.pk
        print(user)
        serializer = TaskSerializer(tasks)
        print(serializer)
        if serializer['user'] != user:
            return Response({'response':"You don't have permission to fetch the data"})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        data['user'] = request.user.pk
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    # def get_queryset(self):
    #     return self.queryset.filter(userId=self.request.user)

#CRUD operation based on the primary key
class taskPrimarykeybased(GenericAPIView):
    
    def get(self, request, pk):

        tasks = Task.objects.get(id=pk)
        data = {}
        user = request.user
        if tasks.user != user:
            data['response'] = "You don't have permission to edit this"
            return Response(data=data)
        
        serializer = TaskSerializer(tasks)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def put(self, request, pk):
        tasks = Task.objects.get(user=pk)
        user = request.user

        if tasks.user != user:
            return Response({'response': "You don't have permission to edit that."})


        serializer = TaskUpdateSerializer(tasks, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        tasks = Task.objects.get(id=pk)
        tasks.delete()
        return Response("Deleted data successfully", status=status.HTTP_200_OK)
