
from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Разрешает доступ только владельцу объекта или администратору.
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_staff

def is_owner_or_admin(request, obj):
    return obj.user == request.user or request.user.is_staff