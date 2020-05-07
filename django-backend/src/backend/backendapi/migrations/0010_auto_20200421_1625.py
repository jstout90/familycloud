# Generated by Django 3.0.3 on 2020-04-21 20:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0009_auto_20200410_0942'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserFolders',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('folder', models.CharField(max_length=25)),
            ],
        ),
        migrations.AddField(
            model_name='userfiles',
            name='folder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='backendapi.UserFolders'),
        ),
    ]