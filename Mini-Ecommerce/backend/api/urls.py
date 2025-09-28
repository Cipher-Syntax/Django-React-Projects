from django.urls import path, include
from rest_framework.routers import DefaultRouter #type: ignore
from .views import ProductViewSet, OrderViewSet, CreateUser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #type: ignore
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('orders', OrderViewSet)

urlpatterns = [
    path('user/register/', CreateUser.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('', include(router.urls)),
]

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)