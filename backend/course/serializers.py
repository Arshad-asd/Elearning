
from rest_framework import serializers
from .models import Category,SubCategory
from .models import Plan


#<----------------------------------------------------Category-Start---------------------------------------------------------------->

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

#<----------------------------------------------------Subcategory-Start---------------------------------------------------------------->

#<----------------------------------------------------Plan-Start---------------------------------------------------------------->

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ['id', 'type', 'amount', 'is_active']

#<----------------------------------------------------Plan-End---------------------------------------------------------------->
