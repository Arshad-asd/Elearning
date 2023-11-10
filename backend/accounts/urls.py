from django.urls import path
from . import views
from .views import  TutorRegistrationView, UserRegistrationView,GetRoutesView ,LogoutView,UserProfileUpdateView,UserProfileView
from .views import CustomTokenObtainPairView, CustomTokenRefreshView,UserListView,BlockUnblockUserView,TutorListView

from course.views import BlockUnblockPlanView, CategoryCreateView, CategoryListAPIView, PlanCreateView, PlanListView, SubCategoryEditView,SubCategoryListView, UpdateCategoryView,BlockUnblockCategoryView,SubCategoryAddView,BlockUnblockSubCategoryView

urlpatterns = [
    path('',views.GetRoutesView.as_view(),name='getRoutes'),
    #<----------------------------------------------------User-Sides-Start-------------------------------------------------------------------------->
    path('user/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('tutor/register/', TutorRegistrationView.as_view(), name='tutor_register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    
    #<-----------------------------------------------------User-Sides-End--------------------------------------------------------------------------------------->
    
    #<-----------------------------------------------------Admin-Sides-Start---------------------------------------------------------------------------------------->
    path('admin/logout/', LogoutView.as_view(), name='logout'),
    path('admin/users/', UserListView.as_view(), name='user-list'),
    path('admin/block-unblock/<int:pk>/', BlockUnblockUserView.as_view(), name='block-unblock-user'),
    path('tutor/tutors/', TutorListView.as_view(), name='tutor-list'),
    path('tutor/block-unblock/<int:pk>/', BlockUnblockUserView.as_view(), name='block-unblock-user'),
    path('admin/create-categories/', CategoryCreateView.as_view(), name='category_create'),
    path('admin/categories/<int:category_id>/', UpdateCategoryView.as_view(), name='update_category'),
    path('admin/categories/block-unblock/<int:pk>/',BlockUnblockCategoryView.as_view(), name='category_block_ublock'),
    path('admin/categories/', CategoryListAPIView.as_view(), name='category-list'),

    path('admin/sub-categories/',SubCategoryListView.as_view(), name="sub-categories"),
    path('admin/create/sub-categories/',SubCategoryAddView.as_view(), name="sub-categories"),
    path('admin/sub-categories/block-unblock/<int:pk>/', BlockUnblockSubCategoryView.as_view(), name="sub_categories_block_ublock"),
    path('admin/update/sub-categories/<int:subcategory_id>/',SubCategoryEditView.as_view(),name="update_sub_categories"),
    
    path('admin/plans/', PlanListView.as_view(), name='plan-list'),
    path('admin/create/plan/', PlanCreateView.as_view(), name='plan-create'),
    path('admin/block-unblock-plan/<int:pk>/',BlockUnblockPlanView.as_view(),name="block-unblock-plan"),
    #<----------------------------------------------------Admin-Sides-End---------------------------------------------------------------------------------------------->
    
    #<----------------------------------------------------Tutor-Sides-Start---------------------------------------------------------------------------------------------->

    path('tutor/update-profile/', UserProfileUpdateView.as_view(), name="update-user"),
    path('tutor/user-profile/<int:id>/', UserProfileView.as_view(), name='user-profile'),

    #<----------------------------------------------------Tutor-Sides-End---------------------------------------------------------------------------------------------->

]
