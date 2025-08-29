from django.db import models

# Create your models here.
class ToDoList(models.Model):
    todo = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        self.todo
