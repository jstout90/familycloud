from django.db import models
from django.contrib.auth.models import User


def user_directory_path(instance, filename):

    return '{0}/{1}'.format(instance.user.username, filename)


class UserFolders(models.Model):
    folder = models.CharField(max_length=25)
    created_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.folder


class UserFiles(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to=user_directory_path)
    uploaded_at = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    folder = models.ForeignKey(UserFolders, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.title
