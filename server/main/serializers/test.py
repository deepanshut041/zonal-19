from rest_framework import serializers
from ..models.test import TestModel

class TestModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestModel
        fields = '__all__'