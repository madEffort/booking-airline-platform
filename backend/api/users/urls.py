from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.SignUpView.as_view(), name='signup'), # 회원가입
    path('login/', views.LoginView.as_view(), name='login'), # 로그인
    path('delete/<int:pk>/', views.UserDeleteView.as_view(), name='delete_user'), # 사용자 삭제
]