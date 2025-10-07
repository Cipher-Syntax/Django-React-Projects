from django.urls import path, include
from rest_framework.routers import DefaultRouter #type: ignore
from .views import ProductViewSet, OrderViewSet,  OrderItemViewSet, CreateUser, daily_deal, add_to_cart, cart_item_count, create_gcash_payment, paymongo_webhook
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #type: ignore
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'order-items', OrderItemViewSet)

urlpatterns = [
    path('deals-of-the-day/', daily_deal, name='deals-of-the-day'),
    path('cart/add/', add_to_cart, name='add_to_cart'),
    path('cart/count/', cart_item_count, name='count-item-count'),
    path('payment/create/<int:order_id>/',create_gcash_payment, name='create_gcash_payment'),
    path('payment/webhook/', paymongo_webhook, name='paymongo_webhook'),
    path('user/register/', CreateUser.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('', include(router.urls)),
]

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)