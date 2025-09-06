from django.urls import path, include
from .views import CreateUser, CategoryViewSet, PostViewSet, CommentViewSet, LikeViewSet
from rest_framework.routers import DefaultRouter #type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #type: ignore
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)

urlpatterns = [
    path('user/register/', CreateUser.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('', include(router.urls)),
]

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)