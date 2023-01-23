from django.db import models


class Employee(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class AutomobileVO(models.Model):
    href = models.CharField(max_length=300, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    manufacturer = models.CharField(max_length=200)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    model = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Sale(models.Model):
    employee = models.ForeignKey(
        Employee,
        related_name="sales",
        on_delete=models.CASCADE,
    )
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

    def __str__(self):
        return self.name
