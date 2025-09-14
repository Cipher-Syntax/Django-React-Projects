from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
    image = models.FileField(upload_to="movie_image/")
    genres = models.ManyToManyField(Genre, related_name='movies')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    
