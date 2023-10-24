from django.urls import path
from . import views
from .views import  TutorRegistrationView, UserRegistrationView,GetRoutesView #UserTokenView AdminTokenObtainPairView,TutorLoginView,
from .views import CustomTokenObtainPairView, CustomTokenRefreshView,UserListView,BlockUnblockUserView,TutorListView



urlpatterns = [
    path('',views.GetRoutesView.as_view(),name='getRoutes'),
    path('user/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('tutor/register/', TutorRegistrationView.as_view(), name='tutor_register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('admin/users/', UserListView.as_view(), name='user-list'),
    path('admin/block-unblock/<int:pk>/', BlockUnblockUserView.as_view(), name='block-unblock-user'),
    path('tutor/tutors/', TutorListView.as_view(), name='tutor-list'),
    path('tutor/block-unblock/<int:pk>/', BlockUnblockUserView.as_view(), name='block-unblock-user'),




]
