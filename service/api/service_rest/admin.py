from django.contrib import admin

# Register your models here.
from .models import *

@admin.register(AutomobileVO)
class AutoMobileVOAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "href",
        "id",
    )

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "date",
        "time",
        "status",
        "id",
    )

@admin.register(Technician)
class Technician(admin.ModelAdmin):
    list_display = (
        "name",
        "id",
    )