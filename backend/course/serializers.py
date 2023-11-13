
from rest_framework import serializers

from accounts.models import UserAccount
from .models import Category, Course, Feature,SubCategory
from .models import Plan


#<----------------------------------------------------Category-Start---------------------------------------------------------------->
#Admin side
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name', 'image', 'is_active']



#<----------------------------------------------------Category-End----------------------------------------------------------->

#<----------------------------------------------------Subcategory-Start---------------------------------------------------------------->


class SubCategorySerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category_ref.category_name')

    class Meta:
        model = SubCategory
        fields = ['id', 'sub_category_name', 'category_name', 'is_active']

#<----------------------------------------------------Subcategory-End---------------------------------------------------------------->

#<----------------------------------------------------Course-Start---------------------------------------------------------------->

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'email']

class CourseSerializer(serializers.ModelSerializer):
    category_ref = CategorySerializer(required=False)
    sub_category_ref = SubCategorySerializer(required=False)
    tutor_ref = UserAccountSerializer(required=False)

    class Meta:
        model = Course
        fields = '__all__'

class AddCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


#<----------------------------------------------------Course-End---------------------------------------------------------------->


#<----------------------------------------------------Plan-Start---------------------------------------------------------------->

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ['id', 'type', 'amount', 'is_active']

class FeatureSerializer(serializers.ModelSerializer):
    plan_name = serializers.ReadOnlyField(source='entry.type')  # Assuming 'entry' is a ForeignKey to Plan model with a 'name' field

    class Meta:
        model = Feature
        fields = ['id', 'entry', 'feature_text', 'plan_name']

#<----------------------------------------------------Plan-End---------------------------------------------------------------->
