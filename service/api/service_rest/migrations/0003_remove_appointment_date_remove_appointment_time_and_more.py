# Generated by Django 4.0.3 on 2023-01-24 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_remove_automobilevo_model'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='date',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='time',
        ),
        migrations.AddField(
            model_name='appointment',
            name='datetime',
            field=models.DateTimeField(null=True),
        ),
    ]