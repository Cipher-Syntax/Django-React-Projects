from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #type: ignore

urlpatterns = [
    path('api/user/register/', views.CreateUser.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/', include('rest_framework.urls')),

    path('api/notes/', views.NoteListCreate.as_view(), name='notes'),
    path('api/notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='delete_note'),
    path('api/notes/update/<int:pk>/', views.NoteUpdate.as_view(), name='update-note')
]