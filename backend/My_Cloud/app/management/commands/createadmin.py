# app/management/commands/createadmin.py
import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.conf import settings

class Command(BaseCommand):
    help = 'Creates a default superuser if one does not exist.'

    def handle(self, *args, **options):
        User = get_user_model()
        
        # Проверяем, существует ли уже админ, чтобы избежать ошибок дублирования
        if User.objects.filter(username='admin').exists():
            self.stdout.write(self.style.WARNING('Admin user already exists.'))
            return

        try:
            # Пароль лучше брать из переменных окружения для безопасности
            admin_password = os.getenv('DJANGO_ADMIN_PASSWORD', 'default_admin_pass_123')
            
            User.objects.create_superuser(
                username='admin',
                email='admin@localhost.local',
                password=admin_password
            )
            self.stdout.write(self.style.SUCCESS('Superuser "admin" created successfully.'))
            
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error creating superuser: {e}'))