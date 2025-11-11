from django.utils import timezone
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView

from drf_spectacular.utils import extend_schema

from .serializers import (
    MessageSerializer,
    RegistrationSerializer,
    UserBaseSerializer,
    MeSerializer,
)


class HelloView(APIView):
    """
    A simple API endpoint that returns a greeting message.
    """

    @extend_schema(
        responses={200: MessageSerializer}, description="Get a hello world message"
    )
    def get(self, request):
        data = {"message": "Hello!", "timestamp": timezone.now()}
        serializer = MessageSerializer(data)
        return Response(serializer.data)


class RegisterAPIView(GenericAPIView):
    """
    Register a new user and create an associated profile.
    """

    serializer_class = RegistrationSerializer

    @extend_schema(
        request=RegistrationSerializer,
        responses={201: UserBaseSerializer},
        description="Register a new user and return minimal user payload.",
    )
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user: User = serializer.save()
        payload = UserBaseSerializer(user).data
        return Response(payload, status=status.HTTP_201_CREATED)


class MeAPIView(APIView):
    """
    Return current authenticated user's combined data.
    """

    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={200: MeSerializer},
        description="Get current authenticated user's profile/info.",
    )
    def get(self, request):
        serializer = MeSerializer(request.user)
        return Response(serializer.data)
