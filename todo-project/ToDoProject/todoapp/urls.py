from django.urls import path
from . import views
from .views import SignUpView, SignInView, LogOutView

urlpatterns = [
    path('', views.apiOverviews, name="api-overview"),
    path('task', views.taskList, name='task'),
    path('task/<str:pk>', views.taskUpdate, name='task'),
    path('signup', SignUpView.as_view(), name='signup'),
    path('signin', SignInView.as_view(), name='signin'),
    path('logout', LogOutView.as_view(), name='logout')
]
