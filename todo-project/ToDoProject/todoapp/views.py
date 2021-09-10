from django.contrib.auth import login
from .models import Task
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TaskSerializer, UserSerializer, RegisterSerializer
from rest_framework import generics, permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from knox.views import LoginView


# Create your views here.


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

@api_view(['GET','PUT'])
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



@api_view(['DELETE'])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()

    return Response('Successfully deleted')

#Sign up API
class SignUpView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


# Login APi
class SignInView(LoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(SignInView, self).post(request, format=None)