
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Category,SubCategory
from .serializers import CategorySerializer,SubCategorySerializer

class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        category_name = request.data.get('category_name', '').strip()

        # Check if the category name is unique
        if Category.objects.filter(category_name__iexact=category_name).exists():
            return Response({'detail': 'Category with this name already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)




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