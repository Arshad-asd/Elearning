import re
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from phonenumber_field.serializerfields import PhoneNumberField


User = get_user_model()
#<------------------------------------------------------------User-Side-Start-------------------------------------------------------->
class UserRegistrationSerializer(serializers.ModelSerializer):
    print('2222222222','working')
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    phone_number = serializers.CharField(
        required=True,
        validators=[
            UniqueValidator(queryset=User.objects.all(), message="Phone number already exists."),
        ]
    )
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)  # Add password2 field

    class Meta:
        model = User
        fields = ['email', 'phone_number', 'password', 'password2']  # Include password2 field in fields

    def validate_password(self, password):
        # Password policy: Minimum 6 characters, at least one uppercase letter, one lowercase letter, and one digit
        if not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$', password):
            raise serializers.ValidationError(
                "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
            )
        return password

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        phone_number = attrs.get('phone_number', None)
        if phone_number:
            # Define a regex pattern for a standard phone number format (adjust as needed)
            phone_number_pattern = r'^\+\d{1,3}-\d{3,14}$'

            # Check if the phone number matches the pattern
            if not re.match(phone_number_pattern, phone_number):
                raise serializers.ValidationError({"phone_number": "Invalid phone number format."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            phone_number=validated_data['phone_number']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    phone_number = PhoneNumberField(source='user.phone_number', read_only=True)

    def get_token(self, user):
        token = super().get_token(user)

        token['user_data'] = {
            'email': user.email,
            'phone': str(self.fields['phone_number'].to_representation(user.phone_number)),  # Convert PhoneNumber to string
            'is_superuser': user.is_superuser,
        }

        return token
#<------------------------------------------------------------------User-Side-End--------------------------------------------------->



#<------------------------------------------------------------------Admin-side-Start------------------------------------------------>

class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        if not user.is_superuser:
            raise serializers.ValidationError("You are not authorized to log in as an admin.")

        token = super().get_token(user)
        # Customize the token data here if needed
        return token

#<------------------------------------------------------------------Admin-Side-End--------------------------------------------------->

#<------------------------------------------------------------------Tutor-Side-Start------------------------------------------------->


class TutorRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    phone_number = serializers.CharField(
        required=True,
        validators=[
            UniqueValidator(queryset=User.objects.all(), message="Phone number already exists."),
        ]
    )
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)  # Add password2 field

    class Meta:
        model = User
        fields = ['email', 'phone_number', 'password', 'password2']  # Include password2 field in fields

    def validate_password(self, password):
        # Password policy: Minimum 6 characters, at least one uppercase letter, one lowercase letter, and one digit
        if not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$', password):
            raise serializers.ValidationError(
                "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
            )
        return password

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        phone_number = attrs.get('phone_number', None)
        if phone_number:
            # Define a regex pattern for a standard phone number format (adjust as needed)
            phone_number_pattern = r'^\+\d{1,3}-\d{3,14}$'

            # Check if the phone number matches the pattern
            if not re.match(phone_number_pattern, phone_number):
                raise serializers.ValidationError({"phone_number": "Invalid phone number format."})
        return attrs
    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            is_tutor = True 
        )

        user.set_password(validated_data['password'])
         # Mark the user as a tutor
        user.save()
        print(user.email,1111111111111111111111111)
        print(user.is_tutor)
        return user


class TutorLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Authenticate the tutor
        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid eamil or password.")

        if not user.is_active or not user.is_tutor:
            raise serializers.ValidationError("You are not authorized to log in as a tutor.")

        refresh = RefreshToken.for_user(user)

        return {
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
        }