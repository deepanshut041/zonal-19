from rest_framework import serializers
from ..models.events import EventModel, UserEventModel

class EventModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventModel
        fields = '__all__'

class EventsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventModel
        fields = ['name', 'date', 'time']

class UserEventModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEventModel
        exclude = ('user', )