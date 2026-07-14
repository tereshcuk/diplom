from pathlib import Path
import os
from dotenv import load_dotenv


# Загружаем переменные из файла .env в окружение ОС
load_dotenv()
# Теперь os.getenv сможет прочитать эти данные
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# # SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = 'django-insecure-hf_eyc*_*9gg2&34f9m^o@#5i+db3&p14sy87!4r9n--m0n#y4'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True # - в продакшене должно быть False

# ALLOWED_HOSTS = ['https://www.reg.ru/',
#                  ]

ALLOWED_HOSTS = [
    'reg.ru', 
    'www.reg.ru', 
    "localhost", 
    "127.0.0.1",
    ]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',    
    'rest_framework',    
    # 'rest_framework.authtoken',
    'corsheaders',
    'app',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware', 
    'django.contrib.sessions.middleware.SessionMiddleware',
    
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
       
]

ROOT_URLCONF = 'My_Cloud.urls'

AUTH_USER_MODEL = 'app.User'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'My_Cloud.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'my_cloud_app', # Имя базы данных
#         'USER': 'postgres',      # Имя пользователя
#         'PASSWORD': '', # Пароль от пользователя postgres
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', 'localhost'), # localhost — значение по умолчанию
        'PORT': os.getenv('DB_PORT', '5432'),      # 5432 — стандартный порт PostgreSQL
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        # 'rest_framework.authentication.TokenAuthentication',
    ],
    
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    
    'DEFAULT_THROTTLE_CLASSES': [
        # 'rest_framework.throttling.UserRateThrottle',
        # 'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'user': '10/minute',
        'anon': '2/minute',
    }
}


MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Укажите адрес вашего фронтенда
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    'https://www.reg.ru',
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000", 
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    ] # Адрес вашего фронтенда


CORS_ALLOW_CREDENTIALS = True
# SESSION_COOKIE_SAMESITE = 'None' # Или 'None' если фронт и бэк на разных портах/девайсах
# CSRF_COOKIE_SAMESITE = 'Lax'
# Опционально: если вы хотите разрешить ВСЕ методы/заголовки
CORS_ALLOW_ALL_HEADERS = True 
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False, # Оставляем False, чтобы не сломать логи Django

    # 1. ФОРМАТЫ (Formatters)
    'formatters': {
        # Простой формат для консоли
        'console_simple': {
            'format': '[{asctime}] {levelname} {message}',
            'style': '{',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
        # Подробный формат для файлов (если понадобится)
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
    },

    # 2. ОБРАБОТЧИКИ (Handlers) - Куда писать?
    'handlers': {
        # Обработчик для вывода в консоль
        'console': {
            'level': 'DEBUG', # будет ловить всё, начиная с DEBUG
            'class': 'logging.StreamHandler',
            'formatter': 'console_simple', # Используем простой формат
        },
    },

    # 3. ЛОГГЕРЫ (Loggers) - Кто пишет?
    'loggers': {
        # Логгер для всего фреймворка Django
        'django': {
            'handlers': ['console'],
            'level': 'INFO', # В продакшене обычно INFO, в разработке DEBUG
            'propagate': True,
        },
        # Логгер приложения (app)
        'app': {
            'handlers': ['console'],
            'level': 'DEBUG', # Для своего кода можно оставить DEBUG, чтобы видеть максимум
            'propagate': True,
        },
    },
}

