from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model, logout as django_logout, login as django_login
from .models import File, User
from .validators import validate_strong_password

# User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User          
        fields = ('id', 'username', 'email', 'full_name', 'is_admin', 'storage_path')
        read_only_fields = ('id',)

class RegisterSerializer(serializers.ModelSerializer):
    
    # password = serializers.CharField(write_only=True)
    password = serializers.CharField(
        write_only=True, 
        validators=[validate_strong_password], 
        style={'input_type': 'password'},
        help_text="Пароль должен быть сложным"
    )
    
    class Meta:
        model = User
        # fields = ('username', 'email', 'password', 'full_name', 'is_admin', 'storage_path')
        fields = ('username', 'email', 'password', 'full_name', 'is_admin')
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password'],
            full_name = validated_data['full_name'],
            is_admin = validated_data['is_admin']
            # storage_path = validated_data['storage_path']
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
    

class FileSerializer(serializers.ModelSerializer):
        
    # file = serializers.FileField(write_only=True)
    file = serializers.FileField(allow_null=True)
    file_url = serializers.SerializerMethodField()
    # original_name = serializers.CharField()
    
    def get_file_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url)
    
    def validate_file(self, value):
        """
        Дополнительная валидация загружаемого файла (опционально).
        Например, проверка расширения или размера до сохранения.
        """
        allowed_extensions = ['pdf', 'docx', 'jpg', 'png', 'txt']
        ext = value.name.split('.')[-1].lower()
        if ext not in allowed_extensions:
            raise serializers.ValidationError(f"Недопустимый формат файла: .{ext}")
        
        max_size_mb = 50
        if value.size > max_size_mb * 1024 * 1024:
            raise serializers.ValidationError(f"Максимальный размер файла — {max_size_mb} МБ")
            
        return value

    
    class Meta:
        model = File
        fields = ('id', 'user', 'unique_name',
             'original_name', 'file', 'file_size', 'file_url','upload_date', 
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
        
        
class SimpleFileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['file', 'comment'] # Пользователь загружает только файл и пишет комментарий
        