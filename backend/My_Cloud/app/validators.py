# api/validators.py
import re
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_strong_password(value):
    """
    Валидатор сложности пароля:
    - Минимум 6 символов
    - Хотя бы одна заглавная буква
    - Хотя бы одна цифра
    - Хотя бы один спецсимвол (!@#$%^&*)
    """
    length_error = _('Пароль должен содержать минимум 6 символов.')
    uppercase_error = _('Пароль должен содержать хотя бы одну заглавную букву.')
    digit_error = _('Пароль должен содержать хотя бы одну цифру.')
    special_char_error = _('Пароль должен содержать хотя бы один спецсимвол (!@#$%^&*).')

    if len(value) < 6:
        raise ValidationError(length_error)
    if not re.search(r'[A-Z]', value):
        raise ValidationError(uppercase_error)
    if not re.search(r'\d', value):
        raise ValidationError(digit_error)
    if not re.search(r'[!@#$%^&*]', value):
        raise ValidationError(special_char_error)