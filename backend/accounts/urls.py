from django.urls import path
from . import views
from .views import AdminTokenObtainPairView, TutorLoginView, TutorRegistrationView, UserRegistrationView,GetRoutesView #UserTokenView
urlpatterns = [
    path('',views.GetRoutesView.as_view(),name='getRoutes'),
    path('user/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('tutor/register/', TutorRegistrationView.as_view(), name='tutor_register'),

    
    # path('get_tokens/', UserTokenView.as_view(), name='get-tokens'),
    path('token/user',views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/admin/', AdminTokenObtainPairView.as_view(), name='admin-token-obtain-pair'),
    path('tutor-login/', TutorLoginView.as_view(), name='tutor-login'),

]
