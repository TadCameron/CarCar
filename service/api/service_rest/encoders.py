from common.json import ModelEncoder
from .models import *

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = {
        "id",
        "name",
    }

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer_name",
        "datetime",
        "status",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }