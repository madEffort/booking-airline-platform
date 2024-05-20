from rest_framework import generics, status
from rest_framework.response import Response
from .pagination import FlightListPagination
from .serializers import FlightSerializer
from .models import Flight

class FlightListView(generics.GenericAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    pagination_class = FlightListPagination
    
    def get(self, request, format=None):
        queryset = self.filter_queryset(self.get_queryset())

        departures = request.query_params.get('departures')
        arrivals = request.query_params.get('arrivals')
        departure_date = request.query_params.get('departure_date')
        arrival_date = request.query_params.get('arrival_date')
        flight_class = request.query_params.get('flightClass')
        airline = request.query_params.get('airline')
        
        filter_applied = False
        
        if departures and arrivals:
            queryset = queryset.filter(departures__name=departures, arrivals__name=arrivals)
            filter_applied = True
        if departure_date and arrival_date:
            queryset = queryset.filter(departure_date=departure_date, arrival_date=arrival_date)
            filter_applied = True
        if flight_class:
            queryset = queryset.filter(flight_class__name=flight_class)
            filter_applied = True
        if airline:
            queryset = queryset.filter(airline__name=airline)
            filter_applied = True

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            if filter_applied and not serializer.data:
                return Response({'flights':[]}, status=status.HTTP_200_OK)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
