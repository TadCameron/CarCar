# Generated by Django 4.0.3 on 2023-01-24 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_rename_model_automobilevo_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='address',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='phone_number',
            field=models.SmallIntegerField(null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='employee_number',
            field=models.SmallIntegerField(null=True),
        ),
    ]
