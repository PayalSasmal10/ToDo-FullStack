from .models import Task
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TaskSerializer

# Create your views here.


@api_view(['GET'])
def apiOverviews(request):
    api_urls = {
        'List': '/task-list',
        'Details View': '/task-detail/<str:pk>/',
        'Create': '/task-creation/',
        'Update': '/task-list/<str:pk>',
        'Delete': '/task-delete/<str:pk>',
    }
    return Response(api_urls)


@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all().order_by('-id')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def taskDetails(request, pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def taskCreation(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST', 'PUT'])
def taskUpdate(request, pk):
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
