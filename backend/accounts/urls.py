from django.urls import path
from . import views
from .views import  TutorRegistrationView, UserRegistrationView,GetRoutesView ,LogoutView
from .views import CustomTokenObtainPairView, CustomTokenRefreshView,UserListView,BlockUnblockUserView,TutorListView

from course.views import CategoryCreateView, CategoryListAPIView,SubCategoryBulkCreateView, UpdateCategoryView,BlockUnblockCategoryView

urlpatterns = [
    path('',views.GetRoutesView.as_view(),name='getRoutes'),
    path('user/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('tutor/register/', TutorRegistrationView.as_view(), name='tutor_register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('admin/logout/', LogoutView.as_view(), name='logout'),
    path('admin/users/', UserListView.as_view(), name='user-list'),
    path('admin/block-unblock/<int:pk>/', BlockUnblockUserView.as_view(), name='block-unblock-user'),
    path('tutor/tutors/', TutorListView.as_view(), name='tutor-list'),
    path('tutor/block-unblock/<int:pk>/', BlockUnblockUserView.as_view(), name='block-unblock-user'),

    path('admin/create-categories/', CategoryCreateView.as_view(), name='category_create'),
    path('admin/categories/<int:category_id>/', UpdateCategoryView.as_view(), name='update_category'),
    path('admin/categories/block-unblock/<int:pk>/',BlockUnblockCategoryView.as_view(), name='category_block_ublock'),

    path('subcategories/bulk_create/', SubCategoryBulkCreateView.as_view(), name='subcategories_bulk_create'),
    path('admin/categories/', CategoryListAPIView.as_view(), name='category-list'),




]
