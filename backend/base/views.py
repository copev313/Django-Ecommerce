# from django.shortcuts import render
# from django.http import JsonResponse
# from django.contrib.auth.models import update_last_login
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
# from .products import products
from .serializers import (
    ProductSerializer,
    UserSerializer,
    UserSerializerWithToken,
)

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        for key, val in serializer.items():
            data[key] = val

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# GET -- all our API routes:
@api_view(['GET'])
def getRoutes(request):
    routes = [
        "/api/products/",
        "/api/products/create/"

        "/api/products/upload/",

        "/api/products/<id>/reviews/",

        "/api/products/top/",
        "/api/products/<id>/",

        "/api/products/delete/<id>/",
        "/api/products/<update>/<id>/",
    ]

    return Response(routes)


# GET -- user profile:
@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# GET -- all products:
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# GET -- product by id/primary key:
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
