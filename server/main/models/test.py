from django.db import models

# Create your models here.
class TestModel(models.Model):
    name = models.CharField(max_length=30, null=False)

    def __str__(self):
        return str(self.name)
