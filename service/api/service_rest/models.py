from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    href = models.CharField(max_length=150)
    vin = models.CharField(max_length=17, unique=True)

    name = models.CharField(max_length=100)
    make = models.CharField(max_length=100)
    year = models.PositiveSmallIntegerField(null = True)
    picture_url = models.URLField()


class Technician(models.Model):
    name = models.CharField(max_length=100, null = True)

class Appointment(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    customer_name = models.CharField(max_length=100)
    datetime = models.DateTimeField(null = True)
    
    status = models.BooleanField(default=False)
    
    technician = models.ForeignKey(Technician, null = True, default=None, on_delete=models.CASCADE)