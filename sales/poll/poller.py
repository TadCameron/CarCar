import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
from sales_rest.models import AutomobileVO
# from sales_rest.models import Something

def get_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for car in content["automobiles"]:
        AutomobileVO.objects.update_or_create(
            href=car["href"],
            defaults={
                "vin": car["vin"],
                "name": car["model.name"],
                "make": car["model.manufacturer"],
                "year": car["year"],
                "picture_url": car["model.picture_url"]
                },
        )

def poll():
    while True:
        try:
            get_automobiles()
        except Exception as e:
            print(e)
        time.sleep(5)


if __name__ == "__main__":
    poll()
