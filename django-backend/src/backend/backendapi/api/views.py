from rest_framework import permissions, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from backendapi.models import UserFiles, UserFolders
from django.contrib.auth.models import User
from .serializers import UserFilesSerializers, UserSerializer, UserFolderSerializer


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserFilesListView(ListAPIView):
    queryset = UserFiles.objects.all()
    serializer_class = UserFilesSerializers
    permission_classes = (permissions.AllowAny, )


class UserFilesDetailView(RetrieveAPIView):
    queryset = UserFiles.objects.all()
    serializer_class = UserFilesSerializers
    permission_classes = (permissions.AllowAny, )


class UserFilesCreateView(CreateAPIView):
    queryset = UserFiles.objects.all()
    serializer_class = UserFilesSerializers
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        serializer = UserFilesSerializers(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserFilesUpdateView(UpdateAPIView):
    queryset = UserFiles.objects.all()
    serializer_class = UserFilesSerializers
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (permissions.IsAuthenticated, )


class UserFilesDeleteView(DestroyAPIView):
    queryset = UserFiles.objects.all()
    serializer_class = UserFilesSerializers
    permission_classes = (permissions.IsAuthenticated, )


class UserFolderView(ListAPIView):
    queryset = UserFolders.objects.all()
    serializer_class = UserFolderSerializer
    permission_classes = (permissions.AllowAny, )


class UserFolderDetailView(RetrieveAPIView):
    queryset = UserFiles.objects.all()
    serializer_class = UserFilesSerializers
    permission_classes = (permissions.AllowAny, )


class UserFolderCreateView(CreateAPIView):
    queryset = UserFolders.objects.all()
    serializer_class = UserFolderSerializer
    permission_classes = (permissions.IsAuthenticated, )


class UserFolderUpdateView(UpdateAPIView):
    queryset = UserFolders.objects.all()
    serializer_class = UserFolderSerializer
    permission_classes = (permissions.IsAuthenticated, )


class UserFolderDeleteView(DestroyAPIView):
    queryset = UserFolders.objects.all()
    serializer_class = UserFolderSerializer
    permission_classes = (permissions.IsAuthenticated, )
