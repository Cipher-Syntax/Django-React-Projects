from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #type: ignore
from .views import CreateUser, ExpenseViewSet
from rest_framework.routers import DefaultRouter #type: ignore

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet)

urlpatterns = [
    path('user/register/', CreateUser.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='access_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]
