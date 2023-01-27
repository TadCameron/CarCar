from django.urls import path
from django.urls import path, include
from .views import (
    api_list_sales,
    api_automobileVOs,
    api_customers,
    api_sale,
    api_employees,
)


urlpatterns = [
    path("sales/", api_list_sales, name="list_sales"),
    path("sales/<int:pk>/", api_sale, name="sale_detail"),
    path("automobiles/", api_automobileVOs, name="api_automobiles"),
    path("customers/", api_customers, name="api_customers"),
    path("employees/", api_employees, name="api_employees"),
]
