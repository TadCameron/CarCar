# Generated by Django 4.0.3 on 2023-01-24 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0004_customer_address_customer_phone_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='phone_number',
            field=models.IntegerField(null=True),
        ),
    ]