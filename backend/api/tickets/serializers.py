from rest_framework import serializers
from django.utils import timezone
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    
    departure = serializers.SerializerMethodField()
    departure_airport = serializers.SerializerMethodField()
    departure_airport_code = serializers.SerializerMethodField()
    
    destination = serializers.SerializerMethodField()
    destination_airport = serializers.SerializerMethodField()
    destination_airport_code = serializers.SerializerMethodField()
    
    departure_date = serializers.SerializerMethodField()
    destination_date = serializers.SerializerMethodField()
    
    departure_time = serializers.SerializerMethodField()
    arrival_time = serializers.SerializerMethodField()
    
    airline = serializers.SerializerMethodField()
    flightClass = serializers.SerializerMethodField()
    
    duration = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    
    class Meta:
        model = Ticket
        fields = ['id', 'departure', 'departure_airport', 'departure_airport_code', 'destination', 'destination_airport',
                'destination_airport_code', 'departure_date', 'destination_date', 'departure_time', 'arrival_time', 'duration', 'airline', 'flightClass', 'price']
    
    def get_departure(self, obj):
        return obj.flight.departures.name
    
    def get_departure_airport(self, obj):
        return obj.flight.departure_airport.name
    
    def get_departure_airport_code(self, obj):
        return obj.flight.departure_airport.code
    
    def get_destination(self, obj):
        return obj.flight.arrivals.name
    
    def get_destination_airport(self, obj):
        return obj.flight.destination_airport.name
    
    def get_destination_airport_code(self, obj):
        return obj.flight.destination_airport.code
    
    def get_departure_date(self, obj):
        return obj.flight.departure_date
    
    def get_destination_date(self, obj):
        return obj.flight.arrival_date
    
    def get_departure_time(self, obj):
        return obj.flight.departure_time.strftime('%H:%M')
    
    def get_arrival_time(self, obj):
        return obj.flight.arrival_time.strftime('%H:%M')
    
    def get_airline(self, obj):
        return obj.flight.airline.name
    
    def get_flightClass(self, obj):
        return obj.flight.flight_class.name
    
    def get_price(self, obj):
        return obj.flight.price
    
    def get_duration(self, obj):
        if obj.flight.departure_time and obj.flight.arrival_time:
            fmt = '%H:%M:%S'
            
            d_time = timezone.datetime.strptime(str(obj.flight.departure_time), fmt)
            a_time = timezone.datetime.strptime(str(obj.flight.arrival_time), fmt)

            duration = a_time - d_time
            total_seconds = int(duration.total_seconds())
            hours = total_seconds // 3600
            minutes = (total_seconds % 3600) // 60
            return f"{hours}시간 {minutes}분"
        return None