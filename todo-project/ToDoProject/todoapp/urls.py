from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverviews, name="api-overview"),
    path('task-list/', views.taskList, name='task-list'),
    path('task-details/<str:pk>/', views.taskDetails, name='task-details'),
    path('task-creation/', views.taskCreation, name='task-creation'),
    path('task-update/<str:pk>/', views.taskUpdate, name='task-update'),
    path('task-delete/<str:pk>/', views.taskDelete, name='task-delete')
]
