from django.contrib import admin
from .models import Airline, Airport, Continent, Country, FlightClass, Flight

@admin.register(Airline)
class AirlineAdmin(admin.ModelAdmin):
    pass

@admin.register(Airport)
class AirportAdmin(admin.ModelAdmin):
    pass

@admin.register(Continent)
class ContinentAdmin(admin.ModelAdmin):
    pass

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    pass

@admin.register(FlightClass)
class FlightClassAdmin(admin.ModelAdmin):
    pass

@admin.register(Flight)
class FlightAdmin(admin.ModelAdmin):
    pass