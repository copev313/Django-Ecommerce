# product_views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review
from base.serializers import ProductSerializer

from rest_framework import status


# GET -- all products / all products that fit search params:
@api_view(['GET'])
def getProducts(request):
    # Grab the 'keyword' query params:
    query = request.query_params.get('keyword')

    if query is None:
        query = ''

    # Case insensitive product name search:
    products = Product.objects.filter(name__icontains=query)

    # Handle pagination:
    NUM_PER_PAGE = 8
    page = query = request.query_params.get('page')
    paginator = Paginator(products, NUM_PER_PAGE)

    try:
        products = paginator.page(page)

    # [CASE] Page query param not passed in --> Go to first page:
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    # [CHECK] Make sure page is handled:
    if page is None:
        page = 1
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data,
                     'page': page,
                     'pages': paginator.num_pages})


# GET -- retreive featured products for the home screen carousel:
@api_view(['GET'])
def getFeaturedProducts(request):
    # Maximum number of products allowed in the carousel:
    MAX_PRODUCTS = 10

    # Filter by featured products & order highest to lowest by rating:
    featured_products = Product.objects.filter(featured=True).order_by('-rating')
    products = featured_products[0:MAX_PRODUCTS]

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# GET -- product by id/primary key:
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# POST -- create a sample product with default values:
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Fruit',
        countInStock=0,
        category='Coming Soon',
        description='',
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# PUT -- update product by id:
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# DELETE -- delete a product by id:
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response("Product has been deleted")


# POST -- upload a product image:
@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()
    return Response("Image was uploaded successfully")


# POST - create a product review:
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # [CASE] Review already exists by this user:
    already_exists = product.review_set.filter(user=user).exists()

    if already_exists:
        message = {'detail': "Product already reviewed"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # [CASE] No Rating was provided -> Return a response:
    elif (data['rating'] == 0):
        message = {'detail': "Please select a rating"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # [CASE] Create Review:
    else:
        Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for rev in reviews:
            total += rev.rating

        product.rating = total / len(reviews)
        product.save()
        return Response("Review added")
