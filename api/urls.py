from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import HelloView, RegisterAPIView, MeAPIView

urlpatterns = [
    path("hello/", HelloView.as_view(), name="hello"),
    path("auth/register", RegisterAPIView.as_view(), name="auth-register"),
    path("auth/me", MeAPIView.as_view(), name="auth-me"),
    path("auth/token", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("auth/token/refresh", TokenRefreshView.as_view(), name="token-refresh"),
]
