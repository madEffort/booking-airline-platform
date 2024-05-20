from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

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