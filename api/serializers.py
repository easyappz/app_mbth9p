from typing import Any, Dict

from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers

from .models import Profile


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)
    timestamp = serializers.DateTimeField(read_only=True)


class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email")
        read_only_fields = ("id",)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("phone", "date_of_birth", "bio")


class MeSerializer(serializers.Serializer):
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    phone = serializers.CharField(read_only=True, allow_blank=True)
    date_of_birth = serializers.DateField(read_only=True, allow_null=True)
    bio = serializers.CharField(read_only=True, allow_blank=True)

    def to_representation(self, instance: User) -> Dict[str, Any]:  # type: ignore[override]
        profile = getattr(instance, "profile", None)
        return {
            "first_name": instance.first_name or "",
            "last_name": instance.last_name or "",
            "email": instance.email or "",
            "phone": getattr(profile, "phone", "") or "",
            "date_of_birth": getattr(profile, "date_of_birth", None),
            "bio": getattr(profile, "bio", "") or "",
        }


class RegistrationSerializer(serializers.Serializer):
    first_name = serializers.CharField(allow_blank=True, required=False)
    last_name = serializers.CharField(allow_blank=True, required=False)
    email = serializers.EmailField()
    phone = serializers.CharField(allow_blank=True, required=False)
    date_of_birth = serializers.DateField(allow_null=True, required=False)
    bio = serializers.CharField(allow_blank=True, required=False)
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate_email(self, value: str) -> str:
        email_norm = value.strip()
        if User.objects.filter(email__iexact=email_norm).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return email_norm

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        password = attrs.get("password")
        password2 = attrs.get("password2")
        if password != password2:
            raise serializers.ValidationError({"password2": "Passwords do not match."})

        # Run Django's password validators
        temp_user = User(
            username=attrs.get("email", ""),
            first_name=attrs.get("first_name", ""),
            last_name=attrs.get("last_name", ""),
            email=attrs.get("email", ""),
        )
        try:
            validate_password(password=password, user=temp_user)
        except DjangoValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

        return attrs

    def create(self, validated_data: Dict[str, Any]) -> User:
        first_name = validated_data.get("first_name", "")
        last_name = validated_data.get("last_name", "")
        email = validated_data["email"].strip()
        phone = validated_data.get("phone", "")
        date_of_birth = validated_data.get("date_of_birth")
        bio = validated_data.get("bio", "")
        password = validated_data["password"]

        # Create the user
        user = User.objects.create_user(
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )

        # Ensure and update profile
        profile: Profile = getattr(user, "profile", None)  # type: ignore[assignment]
        if profile is None:
            profile = Profile.objects.create(user=user)
        profile.phone = phone or ""
        profile.date_of_birth = date_of_birth
        profile.bio = bio or ""
        profile.save()

        return user
