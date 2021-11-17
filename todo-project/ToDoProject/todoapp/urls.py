from django.urls import path
from .views import PasswordCheckTokenAPI, RequestPasswordResetEmail, SignUpView, SignInView, LogOutView, taskList, taskPrimarykeybased, SetNewPasswordAPIView, ChangePasswordAPIView

urlpatterns = [
    path('task', taskList.as_view(), name='task'),
    path('task/<str:pk>', taskPrimarykeybased.as_view(), name='task'),
    path('signup', SignUpView.as_view(), name='signup'),
    path('signin', SignInView.as_view(), name='signin'),
    path('logout', LogOutView.as_view(), name='logout'),
    path('request-reset-email', RequestPasswordResetEmail.as_view(), name='request-reset-email'),
    path('password-reset/<uidbase64>/<token>', PasswordCheckTokenAPI.as_view(), name='password-reset-confirmation'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
    path('change-password', ChangePasswordAPIView.as_view(), name='change-password'),
]
