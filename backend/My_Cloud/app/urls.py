from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UserViewSet, FileViewSet, RegisterAPIView, LoginAPIView, LogoutAPIView, FileDownloadView

router = DefaultRouter()
router.register(r'users', UserViewSet)
# router.register(r'files', FileViewSet)
router.register(r'files', FileViewSet, basename='file')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('files/<int:pk>/download/', FileDownloadView.as_view(), name='file-download'),    
    
]