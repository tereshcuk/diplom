# app/management/commands/createadmin.py
import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.conf import settings

class Command(BaseCommand):
    
    def handle(self, *args, **options):
        User = get_user_model()
        
        # Проверяем, существует ли уже админ, чтобы избежать ошибок дублирования
        if User.objects.filter(username='admin').exists():
            self.stdout.write(self.style.WARNING('Пользователь Admin уже существует.'))
            return

        try:
            # Пароль лучше брать из переменных окружения для безопасности
            admin_password = os.getenv('DJANGO_ADMIN_PASSWORD', 'admin')
            
            User.objects.create_superuser(
                username='admin',
                email='admin@localhost.local',
                password=admin_password
            )
            self.stdout.write(self.style.SUCCESS('Супер пользователь "admin" создан.'))
            
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Ошибка создания суперпользователя: {e}'))