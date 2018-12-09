from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class EventModel(models.Model):
    name = models.CharField(max_length=130, null=False)
    details = models.TextField(null=True)
    rules = models.TextField(null=True)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)

    def __str__(self):
        return str(self.name)

class UserEventModel(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, null=False)
    event = models.ForeignKey(to=EventModel, on_delete=models.CASCADE, null=False)
    enroll_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'event',)