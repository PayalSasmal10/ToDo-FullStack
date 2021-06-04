from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverviews, name="api-overview"),
    path('task', views.taskList, name='task'),
    path('task/<str:pk>', views.taskUpdate, name='task'),
    path('task-delete/<str:pk>/', views.taskDelete, name='task-delete')
]
