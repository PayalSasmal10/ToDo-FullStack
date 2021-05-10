from django.db import models

# Create your models here.


class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.title
