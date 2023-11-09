
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Category, Plan,SubCategory
from .serializers import CategorySerializer, PlanSerializer,SubCategorySerializer
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView




class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


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


class PlanListView(generics.ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    
class PlanCreateView(APIView):
    def post(self, request, *args, **kwargs):

        data = request.data

        # Create a new plan object
        serializer = PlanSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)