from django.urls import path, include
from . import views

urlpatterns = [
    path('signup/', views.SignUpView.as_view(), name='signup'), # 회원가입
    path('login/', views.SignUpView.as_view(), name='login'), # 회원가입
    # path('delete/<int:pk>/', UserDeleteView.as_view(), name='delete_user'),
]