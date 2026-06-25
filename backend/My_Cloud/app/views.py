# from django.shortcuts import render
# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# from rest_framework.permissions import IsAuthenticated
# from rest_framework.throttling import AnonRateThrottle
# from rest_framework.viewsets import ModelViewSet

# from .models import User
# from .serializers import UserSerializer
# from .permissions import IsOwnerOrReadOnly
# from rest_framework.views import APIView
# from rest_framework.generics import ListAPIView, RetrieveAPIView



# class UsersViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     # permission_classes = [IsOwnerOrReadOnly]
#     # throttle_classes = [AnonRateThrottle]

#     # def perform_create(self, serializer):
#     #     serializer.save(user = self.request.user)
   
from rest_framework import viewsets, status, generics, permissions as drf_permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token 
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import login as django_login, logout as django_logout, authenticate, get_user_model

from .models import File, User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, FileSerializer, FileUploadSerializer
from .permissions import IsAdminUser, IsOwnerOrAdmin

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .authentication import CsrfExemptSessionAuthentication # Импортируем наш класс
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny

# ViewSet для управления пользователями (админами)
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

# ViewSet для файлов с кастомной логикой доступа и загрузки
class FileViewSet(viewsets.ModelViewSet):
    # Используем разные сериализаторы для чтения/записи, если это требуется
    # Для простоты оставим один. Если нужен другой для создания - переопределите метод get_serializer_class().
    serializer_class = FileSerializer

    def get_queryset(self):
        """
        Пользователь видит только свои файлы. Админ видит все.
        """
        user = self.request.user
        if user.is_staff:
            return File.objects.all()
        return File.objects.filter(owner = user)
    
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
        """
        Автоматически присваиваем владельца (текущего пользователя) при создании файла.
        """
        serializer.save(owner=self.request.user)

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
        
        # Логин через сессию (если используется SessionAuthentication)
        django_login(request, user)
        
        # Получаем или создаем токен для пользователя (Token Authentication)
        token, created = Token.objects.get_or_create(user = user)
        
        return Response({'token': token.key}, status=status.HTTP_200_OK)


# APIView для выхода (Logout) - удаляет токен.
# class LogoutAPIView(generics.GenericAPIView):
    
#     permission_classes = [drf_permissions.IsAuthenticated] # Доступно только залогиненным
     
#     def post(self, request):
#         try:
#             # Удаляем токен пользователя (если он существует)
#             request.user.auth_token.delete()
#         except (AttributeError, Token.DoesNotExist):
#             # Обрабатываем случай, когда у пользователя нет токена
#             pass
        
#         # Разлогиниваем из сессии
#         django_logout(request)
        
#         return Response(status=status.HTTP_204_NO_CONTENT)
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