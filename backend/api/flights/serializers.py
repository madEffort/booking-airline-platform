from rest_framework import serializers
from django.utils import timezone
from .models import Flight, Airport


class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ['name', 'code']

class FlightSerializer(serializers.ModelSerializer):
    
    departure = serializers.StringRelatedField(source='departures.name')
    departure_airport = serializers.StringRelatedField(source='departure_airport.name')
    departure_airport_code = serializers.StringRelatedField(source='departure_airport.code')
    
    destination = serializers.StringRelatedField(source='arrivals.name')
    destination_airport = serializers.StringRelatedField(source='destination_airport.name')
    destination_airport_code = serializers.StringRelatedField(source='destination_airport.code')
    
    departure_date = serializers.StringRelatedField()
    destination_date = serializers.StringRelatedField()
    
    departure_time = serializers.TimeField(format='%H:%M')
    arrival_time = serializers.TimeField(format='%H:%M')
    
    airline = serializers.StringRelatedField()
    flightClass = serializers.StringRelatedField(source='flight_class')
    
    duration = serializers.SerializerMethodField()
    gate = serializers.StringRelatedField()

    class Meta:
        model = Flight
        fields = ['id', 'departure', 'departure_airport', 'departure_airport_code', 'destination', 'destination_airport',
                'destination_airport_code', 'departure_date', 'destination_date', 'departure_time', 'arrival_time', 'duration', 'airline', 'flightClass', 'price', 'gate']

    def get_duration(self, obj):
        if obj.departure_time and obj.arrival_time:
            fmt = '%H:%M:%S'
            
            d_time = timezone.datetime.strptime(str(obj.departure_time), fmt)
            a_time = timezone.datetime.strptime(str(obj.arrival_time), fmt)

            duration = a_time - d_time
            total_seconds = int(duration.total_seconds())
            hours = total_seconds // 3600
            minutes = (total_seconds % 3600) // 60
            return f"{hours}시간 {minutes}분"
        return None
