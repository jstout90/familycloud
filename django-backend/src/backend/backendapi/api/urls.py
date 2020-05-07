from django.urls import path
from .views import (
    UserListView,
    UserFolderView,
    UserFolderDetailView,
    UserFolderCreateView,
    UserFolderUpdateView,
    UserFolderDeleteView,
    UserFilesListView,
    UserFilesDetailView,
    UserFilesCreateView,
    UserFilesUpdateView,
    UserFilesDeleteView,
)


urlpatterns = [
    path('site-users', UserListView.as_view()),
    path('user-folders', UserFolderView.as_view()),
    path('user-folders/create/', UserFolderCreateView.as_view()),
    path('user-folders/<pk>/', UserFolderDetailView.as_view()),
    path('user-folders/<pk>/update/', UserFolderUpdateView.as_view()),
    path('user-folders/<pk>/delete/', UserFolderDeleteView.as_view()),
    path('myfiles/', UserFilesListView.as_view()),
    path('myfiles/create/', UserFilesCreateView.as_view()),
    path('myfiles/<pk>/', UserFilesDetailView.as_view()),
    path('myfiles/<pk>/update/', UserFilesUpdateView.as_view()),
    path('myfiles/<pk>/delete/', UserFilesDeleteView.as_view()),

]
