from common.json import ModelEncoder
from .models import Sale, Employee, Customer, AutomobileVO


class EmployeeListEncoder(ModelEncoder):
    model = Employee
    properties = [
        "id",
        "name",
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
    ]


class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "href",
        "vin",
        "name",
        "manufacturer",
        "year",
        "picture_url",
    ]


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "employee",
        "customer",
    ]
    encoders = {
        "employee": EmployeeListEncoder(),
        "customer": CustomerListEncoder(),
    }


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "employee",
        "customer",
        "automobile",
        "sales_price",
    ]
    encoders = {
        "employee": EmployeeListEncoder(),
        "customer": CustomerListEncoder(),
        "automobile": AutomobileVOListEncoder(),
    }


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ["id", "name", "address", "phone_number"]
