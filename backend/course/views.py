
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Category, Course, Feature, Plan,SubCategory
from .serializers import AddCourseSerializer, CategorySerializer, CourseSerializer, FeatureSerializer, PlanSerializer,SubCategorySerializer
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView


#<----------------------------------------------------Category-Start---------------------------------------------------------------->

#Admin side
class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

#User side
class CustomPageNumberPagination(PageNumberPagination):
    page_size = 4  # Number of items per page
    page_size_query_param = 'page_size'
    max_page_size = 100
class UserCategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = CustomPageNumberPagination

class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        # Access data using names
        category_name = request.POST.get('categoryName', '').strip()
        image = request.FILES.get('image', None)
        print(image,'image........................')

        # Check if the category name is unique
        if Category.objects.filter(category_name__iexact=category_name).exists():
            return Response({'detail': 'Category with this name already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={'category_name': category_name, 'image': image})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class UpdateCategoryView(APIView):
    def put(self, request, category_id, *args, **kwargs):
        try:
            category = Category.objects.get(id=category_id)
         
            updated_category_data = {
                "category_name": request.data.get("category_name"),
                
            }
            img =request.data.get("image")

            if not isinstance(img, str): # this check the image path is string or not
                updated_category_data["image"] = img
                        
            serializer = CategorySerializer(category, data=updated_category_data, partial=True)
           

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Category.DoesNotExist:
            return Response({"detail": "Category not found"}, status=status.HTTP_404_NOT_FOUND)


class BlockUnblockCategoryView(UpdateAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance:
            instance.is_active = not instance.is_active
            instance.save()

            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

#<----------------------------------------------------Category-End----------------------------------------------------------->


#<----------------------------------------------------Subcategory-Start---------------------------------------------------------------->


class SubCategoryListView(APIView):
    def get(self, request):
        subcategories = SubCategory.objects.all()
        serializer = SubCategorySerializer(subcategories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SubCategoryAddView(APIView):
    def post(self, request):

        # Extract 'category_name' directly from the request data
        category_name = request.data.get('category_name')

        serializer = SubCategorySerializer(data=request.data)
        if serializer.is_valid():
            # Check if the category with the given name already exists
            try:
                category = Category.objects.get(category_name=category_name)
            except Category.DoesNotExist:
                return Response({'error': f'Category "{category_name}" does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save(category_ref=category)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubCategoryEditView(APIView):
    def get_object(self, subcategory_id):
        try:
            return SubCategory.objects.get(id=subcategory_id)
        except SubCategory.DoesNotExist:
            return None

    def get(self, request, subcategory_id):
        subcategory = self.get_object(subcategory_id)
        if subcategory is not None:
            serializer = SubCategorySerializer(subcategory)
            return Response(serializer.data)
        else:
            return Response({'error': f'SubCategory with id {subcategory_id} not found.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, subcategory_id):
        subcategory = self.get_object(subcategory_id)
        if subcategory is not None:
            serializer = SubCategorySerializer(subcategory, data=request.data)
            if serializer.is_valid():
                # Extract 'category_name' directly from the request data
                category_name = request.data.get('category_name')

                # Check if the category with the given name already exists
                try:
                    category = Category.objects.get(category_name=category_name)
                except Category.DoesNotExist:
                    return Response({'error': f'Category "{category_name}" does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

                # Check if the subcategory name is unique within the given category
                if SubCategory.objects.filter(category_ref=category, sub_category_name=serializer.validated_data['sub_category_name']).exclude(id=subcategory_id).exists():
                    return Response({'error': f'SubCategory name must be unique within the category.'}, status=status.HTTP_400_BAD_REQUEST)

                serializer.save(category_ref=category)
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': f'SubCategory with id {subcategory_id} not found.'}, status=status.HTTP_404_NOT_FOUND)

class BlockUnblockSubCategoryView(UpdateAPIView):
    serializer_class = SubCategorySerializer

    def get_queryset(self):
        return SubCategory.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance:
            instance.is_active = not instance.is_active
            instance.save()

            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "SubCategory not found"}, status=status.HTTP_404_NOT_FOUND)


class SubCategoryListView(APIView): # subcategory list correspond category id
    def get(self, request, category_id, format=None):
        try:
            subcategories = SubCategory.objects.filter(category_ref=category_id)
            serializer = SubCategorySerializer(subcategories, many=True)
            return Response(serializer.data)
        except SubCategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
#<----------------------------------------------------Subcategory-End---------------------------------------------------------------->

#<----------------------------------------------------Course-Start---------------------------------------------------------------->

#admin side
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

#User side
# class CourseListPagination(PageNumberPagination):
#     page_size = 4
#     page_size_query_param = 'page_size'
#     max_page_size = 100

class CourseListAPIView(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        sub_category_ref_id = self.request.query_params.get('sub_category_ref', None)
        
        if sub_category_ref_id:
            # Filter courses based on sub_category_ref_id
            queryset = Course.objects.filter(sub_category_ref=sub_category_ref_id)
        else:
            # If no sub_category_ref_id is provided, return all courses
            queryset = Course.objects.all()

        return queryset
    # pagination_class = CourseListPagination


class CourseCreateAPIView(generics.CreateAPIView):
    serializer_class = AddCourseSerializer


class BlockUnblockCourseView(UpdateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        return Course.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance:
            instance.is_active = not instance.is_active
            instance.save()

            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "SubCategory not found"}, status=status.HTTP_404_NOT_FOUND)

#<----------------------------------------------------Course-Start---------------------------------------------------------------->

#<----------------------------------------------------Plan-Start---------------------------------------------------------------->
class PlanListView(generics.ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    
class PlanCreateView(APIView):
    def post(self, request, *args, **kwargs):

        data = request.data

        # Create a new plan object
        serializer = PlanSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlockUnblockPlanView(UpdateAPIView):
    serializer_class = PlanSerializer

    def get_queryset(self):
        return Plan.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance:
            instance.is_active = not instance.is_active
            instance.save()

            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Plan not found"}, status=status.HTTP_404_NOT_FOUND)

class FeatureListView(generics.ListAPIView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

class FeatureDetailView(generics.ListAPIView):
    serializer_class = FeatureSerializer

    def get_queryset(self):
        plan_id = self.kwargs.get('plan_id')  # Assuming the plan_id is passed in the URL
        return Feature.objects.filter(entry_id=plan_id)


class FeatureCreateView(APIView):
    def post(self, request, *args, **kwargs):
        # Validate if plan_name is provided in the request data
        plan_name = request.data.get('plan_name')

        if not plan_name:
            return Response({'error': 'plan_name is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if a Plan with the given name exists
        try:
            plan = Plan.objects.get(type=plan_name)
        except Plan.DoesNotExist:
            return Response({'error': f'Plan with name "{plan_name}" does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        # If Plan exists, proceed to create the Feature
        feature_data = {
            'entry': plan.id,
            'feature_text': request.data.get('feature_text')
        }

        serializer = FeatureSerializer(data=feature_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FeatureUpdateView(RetrieveUpdateAPIView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
#<----------------------------------------------------Plan-End---------------------------------------------------------------->
