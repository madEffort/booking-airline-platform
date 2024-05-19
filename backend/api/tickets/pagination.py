from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class TicketListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    
    def get_paginated_response(self, data):
        return Response({
            'totalItems': self.page.paginator.count,
            'totalPages': self.page.paginator.num_pages,
            'currentPage': self.page.number,
            'tickets': data
        })