from django.contrib import admin
from .models import Manufacturer, VehicleModel, Automobile


admin.site.register(Automobile)

admin.site.register(Manufacturer)
class Manufacturer(admin.ModelAdmin):
    list_display = (
        "name",
        "id",
    )

admin.site.register(VehicleModel)
