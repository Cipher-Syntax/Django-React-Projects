from django.contrib import admin
from .models import Category, Product, Order, OrderItem, DailyDeal, Payment

# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(DailyDeal)
admin.site.register(Payment)