from rest_framework.viewsets import ModelViewSet, ViewSet

from ..models.test import TestModel
from ..serializers.test import TestModelSerializer
# from ..filters.subject import SubjectFilter

class TestModelView(ModelViewSet):
    serializer_class = TestModelSerializer
    queryset = TestModel.objects.all()