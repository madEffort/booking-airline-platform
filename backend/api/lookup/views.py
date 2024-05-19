from rest_framework import generics, status
from api.tickets.serializers import TicketSerializer
from api.tickets.pagination import TicketListPagination
from api.tickets.models import Ticket


class UserTicketListView(generics.ListAPIView):
    
    serializer_class = TicketSerializer
    pagination_class = TicketListPagination
    
    def get_queryset(self):
        email = self.kwargs['email']
        return Ticket.objects.filter(user__email=email)
