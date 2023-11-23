
from rest_framework import serializers

from accounts.models import UserAccount
from .models import Category, Course, Feature, LiveClass,SubCategory, Subscription
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


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.course_name = validated_data.get('course_name', instance.course_name)

        # Check if preview_video is provided and not empty before updating
        preview_video = validated_data.get('preview_video', None)
        if preview_video:
            instance.preview_video = preview_video

        instance.save()
        return instance


#<----------------------------------------------------Course-End---------------------------------------------------------------->

#<----------------------------------------------------Live-Start---------------------------------------------------------------->

class LiveClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiveClass
        fields = ('id', 'title', 'start_time', 'date', 'status', 'access_code', 'course_ref', 'tutor_ref')
#<----------------------------------------------------Live-Start---------------------------------------------------------------->

#<----------------------------------------------------Live-Start---------------------------------------------------------------->

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

#<----------------------------------------------------Subscription-Start---------------------------------------------------------------->

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'
        extra_kwargs = {
            'expire_date': {'required': False},
        }

class SubscriptionListSerializer(serializers.ModelSerializer):
    user_ref = UserAccountSerializer()
    plan_ref = PlanSerializer() 

    class Meta:
        model = Subscription
        fields = '__all__'
#<----------------------------------------------------Subscription-End---------------------------------------------------------------->
