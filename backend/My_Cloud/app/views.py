
from rest_framework import viewsets, status, generics, permissions as drf_permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token 
# from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import login as django_login, logout as django_logout, authenticate, get_user_model

from .models import File, User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, FileSerializer, RenameSerializer, CommentSerializer
from .permissions import IsAdminUser, IsOwnerOrAdmin

# from django.utils.decorators import method_decorator
# from django.views.decorators.csrf import csrf_exempt
from .authentication import CsrfExemptSessionAuthentication # Импортируем наш класс
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from wsgiref.util import FileWrapper
import os
from django.http import HttpResponse
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend # Импорт фильтра
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser 
from rest_framework.decorators import parser_classes as dec_parser_classes, action
import logging

logger = logging.getLogger('app')


# ViewSet для управления пользователями 
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            # Любой аутентифицированный пользователь может получить список пользователей или свой профиль
            permission_classes = [drf_permissions.IsAuthenticated]
        else:
            # Только админы могут создавать, удалять или изменять пользователей
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

# ViewSet для файлов 
class FileViewSet(viewsets.ModelViewSet):
    
    queryset = File.objects.all()
    
    serializer_class = FileSerializer  
    
    parser_classes = [MultiPartParser, FormParser, JSONParser]    
    filter_backends = [DjangoFilterBackend]    
    filterset_fields = ['user'] 

    def get_queryset(self):
        """
        Пользователь видит только свои файлы. Админ видит все.
        """
        logger.debug("Начало метода получения файлов")   
        
        try:
            user = self.request.user  
                        
            logger.info("Пользователь определен %s", user)               
        
            if user.is_staff:
                logger.info("Файлы получены")
                return File.objects.all()

            logger.info("Файлы получены")
            return File.objects.filter(user = user)
    
        except Exception as e:
            logger.error("Ошибка получения файлов: %s", str(e))
    
    def get_permissions(self):
        """
        Настройка прав доступа для разных действий.
        """
        if self.action == 'create':
            # Создавать файлы могут только аутентифицированные пользователи
            permission_classes = [drf_permissions.IsAuthenticated]
        elif self.action in ['update', 'partial_update', 'destroy']:
            # Изменять и удалять файл может только его владелец или админ
            permission_classes = [IsOwnerOrAdmin]
        else: # list, retrieve
            # Просматривать список и детали могут только аутентифицированные
            permission_classes = [drf_permissions.IsAuthenticated]
            
        return [permission() for permission in permission_classes]
    
    
    def perform_create(self, serializer):
        
        uploaded_file = self.request.data.get('file')        
        instance = serializer.save(user=self.request.user)
        if uploaded_file:
            # Размер файла в байтах
            file_size = uploaded_file.size
            
            # Вычисляем оригинальное имя 
            original_name = uploaded_file.name
            
            # Обновляем объект
            instance.file_size = file_size
            instance.original_name = original_name
            instance.save(update_fields=['file_size', 'original_name'])
     
            
    @action(detail=True, methods=['put'])      
    def rename(self, request, pk=None):
        """
        Переименовывает файл.
        Ожидает JSON-объект: {"original_name": "Новое имя файла.txt"}
        """
        logger.debug("Начало метода rename для файла ID=%s", pk)   
        
        try:
            file_obj = self.get_object() # Получаем объект по id (pk)
        
            # Сериализатор для валидации входящих данных
            new_name_serializer = RenameSerializer(data=request.data)
            new_name_serializer.is_valid(raise_exception=True)

            # Обновляем поле original_name
            file_obj.original_name = new_name_serializer.validated_data['original_name']
            file_obj.save(update_fields=['original_name'])
            
            logger.info("Файл успешно переименован на %s", file_obj.original_name)
        
        except Exception as e:
            logger.error("Ошибка при переименовании файла: %s", str(e))

        return Response({"status": "Файл успешно переименован."}, status=status.HTTP_200_OK)
    
    
    @action(detail=True, methods=['put', 'patch']) # PATCH тоже удобен для частичного обновления
    def comment(self, request, pk=None):
        """
        Обновляет комментарий к файлу.
        Ожидает JSON-объект: {"comment": "Новый текст комментария"}
        """
        logger.debug("Начало метода comment для файла ID=%s", pk) 
        try:
            file_obj = self.get_object() # Получаем объект файла

            serializer = CommentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            new_comment = serializer.validated_data['comment']
            file_obj.comment = new_comment
            file_obj.save(update_fields=['comment'])
            
            logger.info("Комментарий успешно изменен на %s", file_obj.original_name)
          
        except Exception as e:
            logger.error("Ошибка при комментарии файла: %s", str(e))    

        return Response({"status": "Комментарий успешно обновлен.", "new_comment": new_comment}, status=status.HTTP_200_OK)
        


class FileDownloadView(APIView):
    """
    Эндпоинт для скачивания файла по ID.
    Доступно только аутентифицированным пользователям.
    """
    permission_classes = [drf_permissions.IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        try:
            # Получаем объект файла из базы данных
            file_obj = File.objects.get(id=pk)

            # Проверка прав доступа: файл должен принадлежать пользователю ИЛИ быть публичным
            if not (file_obj.user == request.user or file_obj.public_link is not None):
                return Response({"detail": "У вас нет прав на скачивание этого файла."}, status=403)

            # Путь к файлу на диске
            file_path = file_obj.file.path # Используем поле 'file' из модели

            # Проверяем, существует ли файл физически
            if not os.path.exists(file_path):
                return Response({"detail": "Файл не найден на сервере."}, status=404)

            # Открываем файл в бинарном режиме
            wrapper = FileWrapper(open(file_path, 'rb'))
            # Формируем ответ
            response = HttpResponse(wrapper, content_type='application/octet-stream')
            
            # Заголовок Content-Disposition подсказывает браузеру,
            # что нужно скачать файл, а не пытаться его открыть.
            # Имя файла будет взято из поля original_name вашей модели.
            response['Content-Disposition'] = f'attachment; filename="{file_obj.original_name}"'
            response['Content-Length'] = os.path.getsize(file_path)

            # Обновляем дату последнего скачивания
            file_obj.last_download_date = timezone.now()
            file_obj.save(update_fields=['last_download_date'])

            return response

        except File.DoesNotExist:
            return Response({"detail": "Файл не найден."}, status=404)    


class PublicFileDownloadView(APIView):
    """
    Эндпоинт для скачивания файла по публичной ссылке.
    Доступно всем без аутентификации.
    """
    permission_classes = [AllowAny] # Любой может получить доступ к этому view

    def get(self, request, public_link, *args, **kwargs):
        try:
            # Ищем файл НЕ ПО ID, А ПО ПОЛЮ 'public_link'
            file_obj = File.objects.get(public_link = public_link)

            # Проверка: если у файла нет публичной ссылки (хотя мы его нашли по ней),
            # или поле пустое, возвращаем ошибку 403.
            if not file_obj.public_link:
                return Response({"detail": "Доступ к файлу закрыт."}, status=403)

            file_path = file_obj.file.path

            if not os.path.exists(file_path):
                return Response({"detail": "Файл не найден на сервере."}, status=404)

            wrapper = FileWrapper(open(file_path, 'rb'))
            response = HttpResponse(wrapper, content_type='application/octet-stream')
            
            response['Content-Disposition'] = f'attachment; filename="{file_obj.original_name}"'
            response['Content-Length'] = os.path.getsize(file_path)

            # Обновляем дату последнего скачивания
            file_obj.last_download_date = timezone.now()
            file_obj.save(update_fields=['last_download_date'])

            return response

        except File.DoesNotExist:
            # Если файл с таким public_link не найден, возвращаем стандартную ошибку 404
            return Response({"detail": "Файл не найден."}, status=404)


# APIView для регистрации (Register)
class RegisterAPIView(generics.CreateAPIView):
    
    
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    authentication_classes = (CsrfExemptSessionAuthentication, TokenAuthentication)
 
# APIView для входа (Login) - возвращает токен
# @method_decorator(ensure_csrf_cookie, name='dispatch')
# @csrf_exempt
class LoginAPIView(generics.GenericAPIView):
    
    permission_classes = [AllowAny]
    authentication_classes = (CsrfExemptSessionAuthentication, TokenAuthentication)
    serializer_class = LoginSerializer
    
    
    
    def post(self, request):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
               
        # # Логин через сессию (если используется SessionAuthentication)
        # django_login(request, user)
        
        # Получаем или создаем токен для пользователя (Token Authentication)
        token, created = Token.objects.get_or_create(user = user)
                   
        return Response({'token': token.key}, status=status.HTTP_200_OK)
       


class LogoutAPIView(generics.GenericAPIView):
    """
    Эндпоинт для выхода пользователя из системы (удаление токена).
    """
    permission_classes = [drf_permissions.IsAuthenticated]

    def post(self, request):
        # Проверяем, есть ли у пользователя связанный токен
        if hasattr(request.user, 'auth_token'):
            # Если есть - удаляем его. Это немедленно делает токен недействительным.
            request.user.auth_token.delete()

        # Выполняем выход из сессии (полезно для SessionAuthentication)
        django_logout(request)

        # Возвращаем успешный ответ без содержимого
        return Response(status=status.HTTP_204_NO_CONTENT)