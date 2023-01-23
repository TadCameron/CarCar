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
jsoony = {
    'href': '/api/automobiles/L337C4R5B01111111/', 
    'id': 1, 'color': 'grey', 'year': 2013, 
    'vin': 'L337C4R5B01111111',
    'model': {
        'href': '/api/models/1/', 
        'id': 1, 
        'name': 'Spacecraft DeLorean', 
        'picture_url': 'https://laughingsquid.com/wp-content/uploads/2020/05/Rick-and-Morty-Prop-Process.png', 
        'manufacturer':
             {'href': '/api/manufacturers/4/', 'id': 4, 'name': 'Rick Sanchez'}}}
# defaults={
#                 "vin": car["vin"],
#                 "name": car["model.name"],
#                 "make": car["model.manufacturer.name"],
#                 "year": car["year"],
#                 "picture_url": car["model.picture_url"],
#             }

def get_Automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for car in content["autos"]:
        # defatty = dict(
        #     vin = car["vin"],
        #     name = car["model.name"],
        #     make = car["model.manufacturer.name"],
        #     year = car["year"],
        #     picture_url= car["model.picture_url"],
        # )
        print(car)
        # defatty = (
        #     {"vin": car["vin"]},
        #     {"name": car["model"]["name"]},
        #     {"make": car["model"]["manufacturer"]["name"]},
        #     {"year": car["year"]},
        #     {"picture_url": car["model"]["picture_url"]},
        # )
        defatty={
            "vin": car["vin"],
            "name": car["model"]["name"],
            "make": car["model"]["manufacturer"]["name"],
            "year": car["year"],
            "picture_url": car["model"]["picture_url"],
        }
        # print("car: ", car)
        AutomobileVO.objects.update_or_create(
            href=car["href"],
            defaults=defatty,  
        )
    #print(content["autos"])
    #print(content)

def poll():
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            
            get_Automobiles()
            print("entered the try")
        except Exception as e:
            print(e, file=sys.stderr)
            print("entered error except")
        time.sleep(5)


if __name__ == "__main__":
    poll()
