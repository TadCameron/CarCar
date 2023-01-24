from django.contrib import admin
from .models import Manufacturer, VehicleModel, Automobile


@admin.register(Automobile)
class AutomobileAdmin(admin.ModelAdmin):
    list_display=(
        "id",
        "model"
    )


@admin.register(VehicleModel)
class VehicleModelAdmin(admin.ModelAdmin):
    list_display=(
        "id",
        "name"
    )

@admin.register(Manufacturer)
class ManufacturerAdmin(admin.ModelAdmin):
    list_display=(
        "id",
        "name",
    )
