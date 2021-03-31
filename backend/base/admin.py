from django.contrib import admin
from .models import (Product,
                     Review,
                     Order,
                     OrderItem,
                     ShippingAddress)


admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
