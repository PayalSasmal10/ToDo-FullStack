from django.http import response
from .models import Task
from rest_framework.response import Response
from rest_framework.decorators import api_view
from todoapp.serializers import LoginSerializer, TaskSerializer, RegisterSerializer, LogoutSerializer
from rest_framework.generics import GenericAPIView
from rest_framework import  status, permissions


@api_view(['GET'])
def apiOverviews(request):
    api_urls = {
        'List': '/task',
        'Update': '/task/<str:pk>',
        'Delete': '/task-delete/<str:pk>',
    }
    return Response(api_urls)


@api_view(['GET', 'POST'])
def taskList(request):
    if request.method == 'GET':
        tasks = Task.objects.all().order_by('-id')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

@api_view(['GET','PUT','DELETE'])
def taskUpdate(request, pk):
    if request.method == 'GET':
        task = Task.objects.get(id=pk)
        serializer = TaskSerializer(instance=task, many=False)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        task = Task.objects.get(id=pk)
        serializer = TaskSerializer(instance=task, data=request.data)
        if serializer.is_valid():
           serializer.save()

        return Response(serializer.data)

    elif request.method == 'DELETE':
        task = Task.objects.get(id=pk)
        task.delete()

        return Response("Successfully Deleted")



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