# Generated by Django 3.0.3 on 2020-04-10 13:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backendapi', '0007_auto_20200403_1050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userfiles',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userfiles', to=settings.AUTH_USER_MODEL),
        ),
    ]