from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def demo_views(request):
    return HttpResponse('Привет мир!')