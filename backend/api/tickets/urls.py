from django.urls import path
from . import views

urlpatterns = [
    path('tickets/', views.TicketListView.as_view(), name='list_tickets'),
    path('purchase/<int:pk>/', views.TicketPurchaseView.as_view(), name='purchase_ticket'),
    path('tickets/<int:pk>/refund/', views.TicketRefundView.as_view(), name='refund_ticket'),
]