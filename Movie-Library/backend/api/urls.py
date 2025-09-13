from django.urls import path, include
from .views import CreateUser, GenreViewSet, MovieViewSet
from rest_framework.routers import DefaultRouter #type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #type: ignore

router = DefaultRouter()
router.register(r'genres', GenreViewSet)
router.register(r'movies', MovieViewSet)

urlpatterns = [
    path('user/register/', CreateUser.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('', include(router.urls)),
]
