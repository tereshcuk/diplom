My_Cloud: Облачное хранилище

My_Cloud — это облачное хранилище, разработанное на Python (Django + Django REST Framework) с использованием базы данных PostgreSQL. Сервис позволяет пользователям  загружать файлы, управлять ими, делиться публичными ссылками.

Технологический стек
Backend: Python 3.x, Django 6.x, Django REST Framework (DRF)
База данных: PostgreSQL
Аутентификация: Сессионная аутентификация (Session Authentication)
Frontend: React.js
Развертывание: Gunicorn + Nginx


Установка и запуск Backend (Локально)
1. Подготовка окружения

Убедитесь, что у вас установлены Python 3.x и Git.

bash
Копировать
# Клонирование репозитория
git clone [ССЫЛКА_НА_ВАШ_GIT_REPO]
cd My_Cloud

<!-- # Создание виртуального окружения
python -m venv venv

# Активация
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate -->
2. Настройка переменных окружения

Создайте файл .env в корне проекта (My_Cloud/.env) на основе примера ниже:

env

DEBUG=True
SECRET_KEY=[ВАШ_СЛОЖНЫЙ_СЕКРЕТНЫЙ_КЛЮЧ_DJANGO]
ALLOWED_HOSTS=localhost,127.0.0.1,[IP_СЕРВЕРА]

# База данных PostgreSQL
DB_NAME=mycloud_db
DB_USER=mycloud_user
DB_PASSWORD=[СЛОЖНЫЙ_ПАРОЛЬ_БД]
DB_HOST=localhost
DB_PORT=5432

# Для создания админа (см. миграции)


3. Установка зависимостей
bash
Копировать
pip install -r requirements.txt

4. Настройка базы данных и миграций

Если PostgreSQL еще не установлен:
Установите сервер PostgreSQL.
Создайте базу данных mycloud_db и пользователя mycloud_user.

Примените миграции:

bash
Копировать
python manage.py migrate
python manage.py createadmin

5. Запуск сервера разработки
bash
Копировать
python manage.py runserver

API будет доступно по адресу: http://127.0.0.1:8000/api/v1/


⚛️ Установка и запуск Frontend

Предполагается, что фронтенд находится в отдельной директории или репозитории.

1. Переход в папку клиента
bash
Копировать
cd frontend # или название вашей папки
npm install
2. Настройка проксирования
В файле frontend/package.json убедитесь, что есть строка для связи с бэкендом во время разработки:

json
Копировать
"proxy": "http://127.0.0.1:8000"
Это позволит отправлять запросы к /api/v1/... без указания полного адреса.

3. Запуск
bash
Копировать
npm start

Фронтенд будет доступен на http://localhost:3000.

🌐 Развертывание на хостинге REG.RU (VPS / Виртуальный хостинг)

1. SSH
	a. Сгенерировать пары ключей на локальном компьютере. Пример:  ssh-keygen -t ed25519 -C "your_email@example.com"
	В результате в папке ~/.ssh/ появятся два файла:
	id_ed25519 — ваш закрытый (приватный) ключ. Никому его не передавайте.
	id_ed25519.pub — ваш открытый (публичный) ключ. Его можно свободно распространять.
	
	b.Через панель управления хостингом
		Скопировать содержимое файла id_ed25519.pub (команда cat ~/.ssh/id_ed25519.pub) и вставить его в веб-форму при создании сервера или в настройки доступа на REG.ru
	
2. Создать сервер на REG.ru иподключиться через терминал
		a. Создать сервер на reg.ru: на почту придет информация о создании мервера с парматрами подключения
		b. Подключиться через терминал у серверу: ssh root@ip_adress из письма
		c. При подключении подтвердить подключение: yes. ip_adress добавиться в список известных хостов на локалбном компьютере.
		d. Ввести пароль из письма
		Произвели подключение под пользователем root
		e. Создадим пользователя для работы с терминалом: 
			1. adduser user -имя пользователя: команда для создания пользователя
			2. usermod user -aG sudo: назначть созданного пользователя супер пользователем
			3. Переподключиться к серверу под созданным пользователем
				logout
				ssh user@ip_adress из письма
				
3. Установка пакетов в Ubuntu
	1. Проверить версию python: python3 --version. 
	2. Проверить версию git: git --version
	3. Обновить список доступных репозиториев: sudo apt update
	4. Подтянуть последние версии библиотек: sudo apt upgrade
	5. Устновить необходимые пакеты:	
		1. Установить sudo apt install python3-venv
		2. Установить sudo apt install python3-pip
		3. Установить sudo apt install postgresql


4. Запуск Django
	
	1. Скачать проект
		1. git clone https://github.com/........
		2. Создать и активировать виртуальное окуружение:
			1. Перейдите в папку проекта и выполните команду: python3 -m venv env
			2. Активация окуржения: source env/bin/activate
		3. Установить зависимости: pip install -r requirements.txt
		4. Установить gunicorn:  pip install gunicorn
	
	2. Создать БД	
		1. Переключитья на пользователя postgres:  sudo su postgres
		2. Запустить панль psql
		3. Создать суперпользователя: CREATE USER user WITH SUPERUSER;
		4. Установить пароль:  ALTER USER user WITH PASSWORD 'password';
		5. Создадим БД: CREATE DATABASE user
		6. Выйдем из панели plsql: \q; exit
		7. Создадим БД для проекта под свое учетной записью:
			1. psql
			2. CREATE DATABASE my_cloud_app
		
	3. Внести корректировки в settings.py (при необходимости)
		1. Проверить, что используются переменные окружения в settings.py
		3. Заполнить ALLOWED_HOSTS - список доменных имен или IP-адресов, с которых ваш сайт разрешено загружать.
		2. Создать файл .env в корне проекта: nano .env, где прописать значения переменных для подключения к БД
		
	4. Применить миграции
		1. python manage.py migrate
		
	5. Воздать пользователя с админ правами
		python manage.py createadmin

5. Зайдите в папку frontend, установите зависимости и соберите production-версию
   1. sudo apt install npm
   2. npm install
   3. npm run build
	
		
		
6. Настрока gunicorn:
	
	1. gunicorn My_Cloud.wsgi:application --bind 0.0.0.0:8000
	
	2. Настрока gunicorn: 
		1. Сделать сервис:
				sudo nano /etc/systemd/system/gunicorn.service
			Пример: 				
			[Unit]
				Description=gunicorn daemon for My_Cloud
				After=network.target

			[Service]

			User=nickolai
			Group=www-data

			WorkingDirectory=/home/nickolai/diplom/backend/My_Cloud

			ExecStart=/home/nickolai/diplom/backend/My_Cloud/env/bin/gunicorn \
    		--access-logfile - \
    		--workers 3 \
    		# Переносим сокет в /run/, который очищается при перезагрузке сервера
    		--bind unix:/run/gunicorn/my_cloud.sock \
    		My_Cloud.wsgi:application

			# Автоматическое управление правами на runtime-директорию
			UMask=0007
			RuntimeDirectory=gunicorn
			RuntimeDirectoryMode=0770

			# Перезапуск службы при падении
			Restart=always
			RestartSec=3s
			TimeoutStopSec=20s

			StandardOutput=append:/var/log/gunicorn/access.log
			StandardError=append:/var/log/gunicorn/error.log

			[Install]
			WantedBy=multi-user.target


   
    3. Для запуска: 
				sudo systemctl start gunicorn
				sudo systemctl enable gunicorn
				sudo systemctl status gunicorn 			
  
			

7. Настроить файл конфигурации web servera	
			
	1. Создать папку: sudo mkdir -p /var/www/my_app
	2. Копируем собранный ранее фронт: sudo cp -r /home/nickolai/diplom/frontend/my_cloud/dist/* /var/www/my_app/ 
	3. Настроить 
      	1. sudo nano /etc/nginx/sites-available/My_Cloud
           Пример: 
   			server {
    				listen 80;
    				server_name 194.67.100.227;

    				# --- НАСТРОЙКА FRONTEND ---
    				# Корневая директория, куда мы скопировали папку dist/build
    				root /var/www/my_app;
    
    				index index.html;

    				location = /favicon.ico { access_log off; log_not_found off; }
  				

					location @fallback {
						# Для SPA-роутинга всегда возвращаем главный файл фронтенда
						root /var/www/my_app;
						rewrite ^ /index.html break;
					}

					# --- НАСТРОЙКА BACKEND (API) ---
					# Все запросы, начинающиеся с /api/, направляем на Gunicorn
					location /api/ {
						proxy_pass http://unix:/home/nickolai/diplom/backend/My_Cloud/my_cloud.sock;
						include proxy_params;
						
						# Важные заголовки для корректной работы Django
						proxy_set_header Host $host;
						proxy_set_header X-Real-IP $remote_addr;
						proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
						proxy_set_header X-Forwarded-Proto $scheme;
					}

					# Отдельная отдача медиафайлов Django (если они грузятся пользователем)
					location /media/ {
						alias /home/nickolai/diplom/backend/media/;
					}

					# Основной блок обработки запросов
    				location / {
        				# Сначала пытаемся найти файл как есть (статику: .js, .css, картинки)
        				try_files $uri $uri/;
        
						# Если файл не найден (пользователь обновил страницу внутри вложенного 
						# маршрута типа /profile/settings), отдаем index.html фронтенда
						error_page 404 = @fallback;
					}
				}