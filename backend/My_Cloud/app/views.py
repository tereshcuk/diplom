from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView

# Create your views here.

# @api_view(['GET', 'POST'])

# def users(request):
    
#     user = User.objects.all()
#     ser = UserSerializer(user, many=True)
    
#     # data = {'message: hello'}
#     return Response(ser.data)


class UsersView(ListAPIView):    
    
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        return Response({'status': 'OK'})
    
    
class UserView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer    
   
   
   
    # def get(self, request):
    #     users = User.objects.all()
    #     ser = UserSerializer(users, many=True)
    #     return Response(ser.data)

    # def post(self, request):
    #     return Response({'status': 'OK'})