from django.db import models
from api.flights.models import Flight
from django.contrib.auth import get_user_model

User = get_user_model()


class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)