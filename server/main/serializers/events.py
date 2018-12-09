from rest_framework import serializers
from ..models.events import EventModel

class EventModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventModel
        fields = '__all__'

class EventsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventModel
        fields = ['name']