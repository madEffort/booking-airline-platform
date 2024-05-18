from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from .serializers import FlightSerializer
from .models import Flight


class FlightListPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'limit'
    
    def get_paginated_response(self, data):
        return Response({
            'totalItems': self.page.paginator.count,
            'totalPages': self.page.paginator.num_pages,
            'currentPage': self.page.number,
            'flights': data
        })

class FlightListView(generics.GenericAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    pagination_class = FlightListPagination
    permission_classes = [AllowAny]
    
    def get(self, request, format=None):
        queryset = self.filter_queryset_by_params(self.get_queryset(), request.query_params)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def filter_queryset_by_params(self, queryset, params):
        filters = {
            'departures__name': params.get('departures'),
            'arrivals__name': params.get('arrivals'),
            'departure_date': params.get('departure_date'),
            'arrival_date': params.get('arrival_date'),
            'flight_class__name': params.get('flightClass'),
            'airline__name': params.get('airline')
        }
        
        # 필터 조건에서 None 값을 제거
        filters = {key: value for key, value in filters.items() if value is not None}
        
        return queryset.filter(**filters) if filters else queryset

