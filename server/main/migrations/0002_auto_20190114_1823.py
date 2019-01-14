# Generated by Django 2.1.4 on 2019-01-14 12:53

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventparticipantmodel',
            name='aadhar_no',
            field=models.CharField(max_length=12, validators=[django.core.validators.RegexValidator(code='nomatch', message='Length has to be 12', regex='^.{12}$')]),
        ),
    ]
