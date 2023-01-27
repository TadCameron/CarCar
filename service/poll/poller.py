import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from service_rest.models import AutomobileVO

def get_Automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for car in content["autos"]:
        print(car)
        defatty={
            "vin": car["vin"],
            "name": car["model"]["name"],
            "make": car["model"]["manufacturer"]["name"],
            "year": car["year"],
            "picture_url": car["model"]["picture_url"],
        }
        AutomobileVO.objects.update_or_create(
            href=car["href"],
            defaults=defatty,  
        )

def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_Automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(5)


if __name__ == "__main__":
    poll()
