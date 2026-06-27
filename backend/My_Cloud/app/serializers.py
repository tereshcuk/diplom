from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model, logout as django_logout, login as django_login
from .models import File, User

# User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User          
        fields = ('id', 'username', 'email', 'full_name', 'is_admin', 'storage_path')
        read_only_fields = ('id',)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'full_name', 'is_admin', 'storage_path')
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password'],
            full_name = validated_data['full_name'],
            is_admin = validated_data['is_admin'],
            storage_path = validated_data['storage_path']
        )
        return user


class LoginSerializer(serializers.Serializer):
    
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(**data)
        
        if user and user.is_active:
            return {'user': user}
        raise serializers.ValidationError("Неверные учетные данные")
    
# class FileSerializer(serializers.ModelSerializer):
    
#     file_path = serializers.SerializerMethodField()
    
#     class Meta:
#         model = File
#         fields = (
#             'id', 'original_name', 'user', 'unique_name', 
#             'file_path', 'file_size', 'upload_date', 
#             'last_download_date', 'comment', 'public_link'
#             )
          
    
#     def get_file_path(self, obj):
#         request = self.context.get('request')
#         file_url = obj.file.url
#         return request.build_absolute_uri(file_url) if request else file_url
# app/serializers.py

class FileSerializer(serializers.ModelSerializer):
        
    file = serializers.FileField(write_only=True)
    # original_name = serializers.CharField()
    
    class Meta:
        model = File
        fields = ('id', 'user', 'unique_name',
             'original_name', 'file', 'file_size', 'upload_date', 
            'last_download_date', 'comment', 'public_link'
        )
        read_only_fields = ['id', 'user', 'unique_name', 'file_size'] # Эти поля заполнятся автоматически
        

class RenameSerializer(serializers.Serializer):
    """
    Сериализатор для изменения имени файла.
    """
    original_name = serializers.CharField(max_length=255)    
        

class CommentSerializer(serializers.Serializer):
    """
    Сериализатор для обновления комментария к файлу.
    """
    comment = serializers.CharField(allow_blank=True) # allow_blank разрешает пустые комментарии


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('original_name',)