# Generated by Django 5.0.6 on 2024-05-18 11:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('flights', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flight', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='flights.flight')),
            ],
        ),
    ]
