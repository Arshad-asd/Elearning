from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import AdminTokenObtainPairSerializer, MyTokenObtainPairSerializer, TutorLoginSerializer, TutorRegistrationSerializer, UserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.
class GetRoutesView(APIView):
    def get(self, request):
        routes = [
            'api/token/user',
            'api/token/admin',
            'api/token/refresh/',
            'api/token/verify/',
            'api/user/register',
            'api/tutor/register/'
        ]

        return Response(routes)

#<--------------------------------------------------------User_Side------------------------------------------------------------->

class UserRegistrationView(APIView):

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserRegistrationSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

# class UserTokenView(APIView):
#     permission_classes = [IsAuthenticated]
#     def post(self, request):
#         user = request.user  # Assuming the user is already authenticated
#         if user:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),                # Refresh token
#                 'access': str(refresh.access_token),    # Access token
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({'detail': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)


#<------------------------------------------------------Admin-Side------------------------------------------------------------------>
class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer


#<------------------------------------------------------Tutor-Side------------------------------------------------------------------>
class TutorRegistrationView(APIView):
    def post(self, request):
        serializer = TutorRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Tutor registration successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TutorLoginView(APIView):
    def post(self, request):
        serializer = TutorLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)