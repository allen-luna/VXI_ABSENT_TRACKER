from django.urls import path, include
from . import views

urlpatterns = [
    path("absent-request/", views.AbsentListCreate.as_view(), name="absent-request"),
    path("absent-request/data/", views.AbsentGetRequest.as_view(), name="absent-request-data"),
    path('absent-requests/update/<int:pk>/', views.AbsentUpdate.as_view(), name='absent-update'),
    path('update/user/<int:pk>/', views.UpdateAddedUser.as_view(), name='user-update'),
    path('delete/user/<int:pk>/', views.DeleteUserProfileView.as_view(), name='user-delete'),
]