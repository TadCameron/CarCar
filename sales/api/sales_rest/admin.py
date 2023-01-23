from django.contrib import admin
from .models import Sale, Customer, Employee, AutomobileVO



@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display=(
        "employee",
        "id",
        "customer"
    )

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display=(
        "name",
        "id"
    )

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display=(
        "name",
        "id",
    )


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display=(
        "id",
    )
