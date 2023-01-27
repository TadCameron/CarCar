from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Sale, Employee, Customer, AutomobileVO
from .encoders import (
    EmployeeListEncoder,
    CustomerListEncoder,
    AutomobileVOListEncoder,
    SaleDetailEncoder,
)


# EMPLOYEES


@require_http_methods(["GET", "POST"])
def api_employees(request):
    if request.method == "GET":
        employees = Employee.objects.all()
        return JsonResponse(
            {"sales_persons": employees},
            encoder=EmployeeListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            employee = Employee.objects.create(**content)
            return JsonResponse(
                employee,
                encoder=EmployeeListEncoder,
                safe=False,
            )
        except Exception:
            response = JsonResponse({"message": "Could not create the sales person"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_employee(request, pk):
    if request.method == "GET":
        try:
            employee = Employee.objects.get(id=pk)
            return JsonResponse(employee, encoder=EmployeeListEncoder, safe=False)
        except Employee.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            employee = Employee.objects.get(id=pk)
            employee.delete()
            return JsonResponse(employee, encoder=EmployeeListEncoder, safe=False)
        except Employee.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            content = json.loads(request.body)
            employee = Employee.objects.get(id=pk)
            employee.name = content["name"]
            employee.save()
            return JsonResponse(employee, encoder=EmployeeListEncoder, safe=False)
        except Employee.DoesNotExist:
            response = JsonResponse({"message": "Could not update the sales person"})
            response.status_code = 400
            return response


#   CUSTOMERS


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False,
            )
        except Exception:
            response = JsonResponse({"message": "Could not create the customer"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(customer, encoder=CustomerListEncoder, safe=False)
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(customer, encoder=CustomerListEncoder, safe=False)
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)
            customer.name = content["name"]
            customer.save()
            return JsonResponse(customer, encoder=CustomerListEncoder, safe=False)
        except Customer.DoesNotExist:
            response = JsonResponse(
                {"message": "Could not update the potential customer"}
            )
            response.status_code = 400
            return response


# AUTOMOBILES


@require_http_methods(["GET"])
def api_automobileVOs(request):
    if request.method == "GET":
        automobileVO = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobileVO": automobileVO},
            encoder=AutomobileVOListEncoder,
        )


# SALES


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleDetailEncoder,
        )
    else:
        # because all of these are foreign keys, we need to assign the attribute to the
        # key we're trying to create, in this case the id.
        content = json.loads(request.body)
        customerid = content["customer"]
        customer = get_object_or_404(Customer, id=customerid)
        content["customer"] = customer
        employeeid = content["employee"]
        employee = get_object_or_404(Employee, id=customerid)
        content["employee"] = employee
        automobileid = content["automobile"]
        automobile = get_object_or_404(AutomobileVO, id=automobileid)
        content["automobile"] = automobile

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_sale(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=pk)
            return JsonResponse(sale, encoder=SaleDetailEncoder, safe=False)
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(sale, encoder=SaleDetailEncoder, safe=False)
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:  # for POST
        try:
            content = json.loads(request.body)
            sale = Sale.objects.get(id=pk)
            sale.employee = content["employee"]
            sale.customer = content["customer"]
            sale.save()
            return JsonResponse(sale, encoder=SaleDetailEncoder, safe=False)
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Could not update the sale"})
            response.status_code = 400
            return response
