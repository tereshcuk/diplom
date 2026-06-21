from django.contrib import admin
from .models import User, File

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'full_name', 'email', 'is_admin', 'storage_path']
    list_filter = ['username', 'is_admin', ]


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'original_name', 'unique_name', 'file_path', 'file_size', 'upload_date', 'last_download_date']
