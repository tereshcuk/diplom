from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from app.views import PublicFileDownloadView

urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('api/v1/', include('app.urls')),
    path('files/<str:public_link>/', PublicFileDownloadView.as_view(), name='file-download-by-link'),    

 ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)