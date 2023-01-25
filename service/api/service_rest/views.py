from django.shortcuts import render, get_object_or_404
from .models import *
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder, DateEncoder
# Create your views here.

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
        #"datetime": DateEncoder(),
    }
@require_http_methods(["GET"])
def api_is_vip(request, vin):
    auto = AutomobileVO.objects.filter(vin=vin)

    if len(auto) > 0:
        return JsonResponse(
            {"vip": "true"},
        )
    return JsonResponse({"vip": "false"})


@require_http_methods(["GET","POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        techy = Technician.objects.create(name=content["name"])

        return JsonResponse(
            techy,
            encoder=TechnicianEncoder,
            safe=False,
        )



@require_http_methods(["GET","POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        techy_id = content["technician"]
        techy = Technician.objects.get(id=techy_id)
        content["technician"] = techy

        appointment = Appointment.objects.create(**content)
        #print(appointment)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["GET","DELETE","PUT"])
def api_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        appointment = get_object_or_404(Appointment, id = pk)
        appointment.delete()
        return JsonResponse(
            appointment, 
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        appointment = get_object_or_404(Appointment, id = pk)

        props = ["vin", "customer_name", "datetime", "status", "technician"]

        for prop in props:
            if prop in content:
                if prop == "technician":
                    techy_id = content["technician"]
                    techy = get_object_or_404(Technician, id = techy_id)
                    content["technician"] = techy
                    setattr(appointment, prop, content["technician"])
                else:
                    setattr(appointment, prop, content[prop])
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder, 
            safe=False,
        )


@require_http_methods(["GET","DELETE","PUT"])
def api_technician(request, pk):
    if request.method == "GET":
        techy = get_object_or_404(Technician, id=pk)
        return JsonResponse(
            techy,
            encoder=TechnicianEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        techy = get_object_or_404(Technician, id = pk)
        techy.delete()
        return JsonResponse(
            techy,
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        techy = get_object_or_404(Technician, id = pk)
        setattr(techy, "name", content["name"])
        techy.save()
        return JsonResponse(
            techy,
            encoder=TechnicianEncoder,
            safe=False,
        )

