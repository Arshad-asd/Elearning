
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Category,SubCategory
from .serializers import CategorySerializer,SubCategorySerializer
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView


class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        # Access data using names
        category_name = request.POST.get('categoryName', '').strip()
        image = request.FILES.get('image', None)

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
        updated_category_data = {
            "category_name": request.data.get("categoryName"),
            # Include other fields that you want to update
        }
        try:
            category = Category.objects.get(id=category_id)
            serializer = CategorySerializer(category, data=updated_category_data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Category.DoesNotExist:
            return Response({"detail": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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


class SubCategoryBulkCreateView(generics.CreateAPIView):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

    def create(self, request, *args, **kwargs):
        category_id = request.data.get('category_id')
        subcategories_data = request.data.get('subcategories', [])

        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response({'detail': 'Category not found.'}, status=status.HTTP_404_NOT_FOUND)

        subcategories = []
        for subcategory_data in subcategories_data:
            subcategory_data['category_ref'] = category_id
            serializer = SubCategorySerializer(data=subcategory_data)
            if serializer.is_valid():
                serializer.save()
                subcategories.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'subcategories': subcategories}, status=status.HTTP_201_CREATED)



class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer