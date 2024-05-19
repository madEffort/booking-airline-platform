from django.urls import path
from . import views

urlpatterns = [
    path('users/email/<str:email>/tickets/', views.UserTicketListView.as_view(), name='list_user_tickets'),
]