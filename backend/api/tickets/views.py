from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import TicketSerializer
from .pagination import TicketListPagination
from api.flights.models import Flight
from .models import Ticket


class TicketListView(generics.ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    pagination_class = TicketListPagination
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


class TicketPurchaseView(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def create(self, request, *args, **kwargs):

        flight_id = request.data.get("flightId")

        try:
            flight = Flight.objects.filter(id=flight_id).first()
        except Flight.DoesNotExist:
            return Response(
                {"message": "Invalid flight ID"}, status=status.HTTP_404_NOT_FOUND
            )

        ticket = Ticket(user=request.user, flight=flight)
        ticket.save()

        serializer = self.get_serializer(ticket)
        return Response(
            {"message": "구매 완료", "ticket": serializer.data},
            status=status.HTTP_201_CREATED,
        )


class TicketRefundView(generics.DestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
