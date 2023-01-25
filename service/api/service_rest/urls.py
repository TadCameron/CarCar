from django.urls import path
from .views import *

urlpatterns = [
    path("service/appointments/", api_appointments, name="api_appointments"),
    path("service/appointments/<int:pk>/", api_appointment, name="api_appointment"),
    path("service/technicians/", api_technicians, name="api technicians"),
    path("service/technicians/<int:pk>/", api_technician, name="api technician"),
    path("service/is_vip/<str:vin>/", api_is_vip, name="api is vip")
]
