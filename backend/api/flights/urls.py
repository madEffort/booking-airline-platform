from django.urls import path
from . import views

urlpatterns = [
    # 항공편 목록 조회 뷰 
    path('flights/', views.FlightListView.as_view(), name='list_flights'),
]