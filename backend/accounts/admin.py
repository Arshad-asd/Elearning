from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserAccount

class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'email', 'phone_number', 'is_active', 'is_staff', 'date_joined')
    search_fields = ('email', 'phone_number')

    # Remove 'ordering' or use a field that is present in your UserAccount model
    # For example, if you want to order by date_joined, you can do the following:
    ordering = ('date_joined',)

admin.site.register(UserAccount, CustomUserAdmin)
