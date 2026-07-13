from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
import uuid
from django.conf import settings
from django.utils import timezone
import os
import logging


logger = logging.getLogger('app')

def user_directory_path(instance, filename):
    
    ext = filename.split('.')[-1]
    # Создаем уникальное имя файла, сохраняя расширение
    unique_filename = f"{uuid.uuid4()}.{ext}"
    return f'users/{instance.user.id}/{unique_filename}'



class User(AbstractUser):
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='app_users',  # Уникальное имя для обратной связи
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='app_users',  # Уникальное имя для обратной связи
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )
       
    full_name = models.CharField(
        'Полное имя',
        max_length = 150,
        blank = True,
        help_text = 'Укажите полное имя пользователя',
    )

    
    is_admin = models.BooleanField(
        'Администратор',
        default = False,
        help_text = 'Предоставляет доступ к административному интерфейсу',
    )

    # Путь к папке пользователя в файловой системе
    storage_path = models.CharField(
        'Путь к хранилищу',
        max_length = 255,
        unique = True,
        help_text = 'Уникальный путь к директории пользователя на сервере',
    )

    # Валидатор для username: только латиница и цифры, первый символ - буква
    username_validator = RegexValidator(
        regex=r'^[a-zA-Z][a-zA-Z0-9]{3,19}$',
        message=(
            'Имя пользователя должно начинаться с буквы, содержать только '
            'латинские буквы и цифры, и иметь длину от 4 до 20 символов.'
        ),
    )
    # Применение валидатора к полю username
    username = models.CharField(
        'Имя пользователя',
        max_length=150,
        unique=True,
        help_text='Обязательное. От 4 до 20 символов. Только латиница и цифры.',
        validators=[username_validator],
        error_messages={
            'unique': 'Пользователь с таким именем уже существует.',
        },
    )

    # Убедимся, что email уникален (на случай, если в будущем это изменится в ядре Django)
    email = models.EmailField(
        'Email',
        unique=True,
        error_messages={
            'unique': 'Пользователь с таким email уже существует.',
        },
    )

    def __str__(self):
        return self.username
    
    # def save(self, *args, **kwargs):
    #     is_new_user = not self.pk  # Проверяем, создается ли пользователь впервые

    #     super().save(*args, **kwargs)

    #     # Если пользователь только что создан — создаем его личную папку
    #     if is_new_user:
    #         # Формируем безопасный путь (например, D:/media/users/1/)
    #         path = os.path.join(settings.MEDIA_ROOT, 'users', str(self.id))
    #         try:
    #             os.makedirs(path, exist_ok=True)
    #             # Обновляем поле storage_path в базе данных
    #             self.storage_path = path.replace(settings.MEDIA_ROOT, '').lstrip('/')
    #             # Важно: вызываем save снова, но уже без триггера создания папки
    #             super().save(update_fields=['storage_path'])
    #         except OSError as e:
    #             # Логируем ошибку, если папку создать не удалось
    #             print(f"Ошибка создания директории {path}: {e}")
    def save(self, *args, **kwargs):
        
        
        is_new_user = self.pk is None  # Проверяем создание нового объекта по pk

        super().save(*args, **kwargs)

        if is_new_user and not self.storage_path:
            # Формируем относительный путь от MEDIA_ROOT строго как строку
            relative_path = os.path.join('users', str(self.id))
            
            # Полный абсолютный путь на диске сервера для создания папки
            absolute_path = os.path.join(settings.MEDIA_ROOT, relative_path)
            logger.debug("Создаем директорию save user")
            try:
                
                logger.info("директория: %s", absolute_path)
                # Создаем директорию рекурсивно, если её нет
                os.makedirs(absolute_path, exist_ok=True)
                
                # Сохраняем в БД только ОТНОСИТЕЛЬНЫЙ путь (без MEDIA_ROOT)
                # Это критически важно для корректной работы FileField                
                self.storage_path = relative_path.replace('\\', '/') # Приводим слэши к единому виду
                logger.info("Сохраняем в БД только ОТНОСИТЕЛЬНЫЙ путь: %s", self.storage_path)
                
                # Вызываем родительский save снова, но ТОЛЬКО для обновления storage_path,
                # чтобы избежать бесконечного цикла вызовов save()
                super().save(update_fields=['storage_path'])
                
            except OSError as e:
                # Если папку создать не удалось, выводим ошибку в консоль 
                # (в реальном проекте лучше использовать logging.error())
                # print(f"Ошибка создания директории пользователя {absolute_path}: {e}")
                # raise ValidationError({'detail': f'Не удалось создать хранилище пользователя: {str(e)}'})
                logger.error(f"Ошибка создания директории пользователя {absolute_path}: {e}", str(e))
                logger.error({'detail': f'Не удалось создать хранилище пользователя: {str(e)}'}, str(e))


    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        


class File(models.Model):    
   
      
    # file = models.FileField(upload_to='uploads/') # <--- Поле ДОЛЖНО называться 'file'
    file = models.FileField(
        upload_to=user_directory_path,
        verbose_name='Файл'
    )  

    # Связь с пользователем-владельцем. При удалении пользователя все его файлы будут удалены.
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        verbose_name='Владелец файла',
        related_name='files',
        help_text='Пользователь, которому принадлежит этот файл',
    )
        

    # Оригинальное имя файла, с которым он был загружен
    original_name = models.CharField(
        'Оригинальное имя файла',
        max_length=255,
        help_text='Имя файла, указанное пользователем при загрузке',
    )

    # Уникальное имя файла на диске для избежания конфликтов (например, UUID)
    unique_name = models.CharField(
        'Уникальное имя файла',
        max_length=255,
        unique=True,
        help_text='Системное имя файла, под которым он хранится на сервере',
    )

    # Полный путь к файлу на сервере (относительно MEDIA_ROOT или другого каталога)
    file_path = models.CharField(
        'Путь к файлу',
        max_length=512,
        help_text='Полный путь к файлу в файловой системе сервера',
    )

    # Размер файла в байтах
    file_size = models.BigIntegerField(
        'Размер файла (байт)',
        default=0,
        help_text='Размер файла в байтах',
    )

    # Дата и время загрузки файла
    upload_date = models.DateTimeField(
        'Дата загрузки',
        default=timezone.now,
        help_text='Дата и время, когда файл был загружен',
    )

    # Дата и время последнего скачивания
    last_download_date = models.DateTimeField(
        'Дата последнего скачивания',
        null=True,
        blank=True,
        help_text='Дата и время последнего скачивания этого файла',
    )

    # Комментарий пользователя к файлу
    comment = models.TextField(
        'Комментарий',
        blank=True,
        help_text='Произвольный комментарий, добавленный пользователем',
    )

    # Уникальная публичная ссылка для скачивания файла без авторизации
    public_link = models.UUIDField(
        'Публичная ссылка',
        default=uuid.uuid4,
        editable=False,
        unique=True,
        help_text='Уникальная ссылка для скачивания файла',
    )

    def save(self, *args, **kwargs):
        # Автоматическое заполнение полей при сохранении объекта
        if self.file and not self.unique_name:
            self.original_name = os.path.basename(self.file.name)
            # Извлекаем системное имя файла из полного пути storage
            self.unique_name = os.path.basename(self.file.name)
        
        if self.file:
            self.file_size = self.file.size
            # Сохраняем относительный путь от MEDIA_ROOT
            self.file_path = self.file.name
            
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Файл: {self.original_name} пользователя: {self.user.username}'

    class Meta:
        verbose_name = 'Файл'
        verbose_name_plural = 'Файлы' 