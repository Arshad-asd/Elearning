from django.contrib import admin
from django.utils.html import format_html
from .models import Category, SubCategory, Course, Lesson, Plan, Feature, Subscription



# Course manage
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category_name', 'subscribed_count', 'display_image', 'is_active', 'subcategories_list')
    search_fields = ('category_name',)

    def display_image(self, obj):
        return format_html('<img src="{}" style="max-height: 50px; max-width: 50px;" />', obj.image.url)

    display_image.short_description = 'Image'

    def subcategories_list(self, obj):
        subcategories = SubCategory.objects.filter(category_ref=obj)
        return ', '.join([sub.sub_category_name for sub in subcategories])

    subcategories_list.short_description = 'Subcategories'



class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'sub_category_name', 'category_name', )
    search_fields = ('sub_category_name', 'category_ref__category_name')

    def category_name(self, obj):
        return obj.category_ref.category_name

    category_name.short_description = 'Category Name'

admin.site.register(SubCategory, SubCategoryAdmin)
admin.site.register(Course)
admin.site.register(Lesson)

# Plans manage
admin.site.register(Plan)
admin.site.register(Feature)

# Subscriptions manage
admin.site.register(Subscription)