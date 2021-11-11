from django.urls import path
from .views import SignUpView, SignInView, LogOutView, taskList, taskPrimarykeybased

urlpatterns = [
    path('task', taskList.as_view(), name='task'),
    path('task/<str:pk>', taskPrimarykeybased.as_view(), name='task'),
    path('signup', SignUpView.as_view(), name='signup'),
    path('signin', SignInView.as_view(), name='signin'),
    path('logout', LogOutView.as_view(), name='logout')
]
