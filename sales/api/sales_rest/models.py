from django.db import models


class Employee(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.SmallIntegerField(null=True)

    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100, null=True)
    phone_number = models.CharField(max_length=10, null=True)

    def __str__(self):
        return self.name


class AutomobileVO(models.Model):
    href = models.CharField(max_length=300, unique=True, null=True)
    vin = models.CharField(max_length=17, unique=True)
    name = models.CharField(max_length=50)
    manufacturer = models.CharField(max_length=200)
    year = models.PositiveSmallIntegerField()
    picture_url = models.URLField(max_length=200, null=True)

    def __str__(self):
        return self.name


class Sale(models.Model):
    employee = models.ForeignKey(
        Employee,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    sales_price = models.IntegerField(null=True)
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
