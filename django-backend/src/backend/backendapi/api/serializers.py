from rest_framework import serializers
from backendapi.models import UserFiles, UserFolders
from django.contrib.auth.models import User


class UserFilesSerializers(serializers.ModelSerializer):

    user = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    folder = serializers.SlugRelatedField(queryset=UserFolders.objects.all(), slug_field='folder', required=False, allow_null=True)

    class Meta:
        model = UserFiles
        fields = ('id', 'title', 'file', 'user', 'uploaded_at', 'folder')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'last_login',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'date_joined',
            'groups'
        )


class UserFolderSerializer(serializers.ModelSerializer):

    created_by = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')

    class Meta:
        model = UserFolders
        fields = (
            'id',
            'folder',
            'created_by'

        )
