# Generated by Django 3.0.3 on 2020-04-01 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0003_auto_20200401_1533'),
    ]

    operations = [
        migrations.AlterField(
            model_name='images',
            name='uploaded_at',
            field=models.DateField(auto_now_add=True),
        ),
    ]