from django.contrib import admin
from django.utils.html import format_html
from .models import Category, SubCategory, Course, Lesson, Plan, Feature, Subscription



# Course manage
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category_name', 'subscribed_count', 'display_image', 'is_active')
    search_fields = ('category_name',)

    def display_image(self, obj):
        return format_html('<img src="{}" style="max-height: 50px; max-width: 50px;" />', obj.image.url)

    display_image.short_description = 'Image'



admin.site.register(Category, CategoryAdmin)
admin.site.register(SubCategory)
admin.site.register(Course)
admin.site.register(Lesson)

# Plans manage
admin.site.register(Plan)
admin.site.register(Feature)

# Subscriptions manage
admin.site.register(Subscription)