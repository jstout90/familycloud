# Generated by Django 3.0.3 on 2020-04-03 14:50

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backendapi', '0006_auto_20200401_1537'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Videos',
            new_name='UserFiles',
        ),
        migrations.DeleteModel(
            name='Images',
        ),
    ]