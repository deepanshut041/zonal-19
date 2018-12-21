from rest_framework.viewsets import ModelViewSet, ViewSet
from django.http import Http404
from rest_framework import viewsets, mixins, serializers
from ..models.events import EventModel, UserEventModel
from ..serializers.events import EventModelSerializer, EventsModelSerializer
from ..serializers.events import UserEventModelSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny
from ..base.permissions import IsOwnerOrAdmin, IsSuperUser, IsOwnerOrStaff

class EventModelView(ModelViewSet):
    queryset = EventModel.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return EventsModelSerializer
        else:
            return EventModelSerializer
        return serializers.Default

    def get_permissions(self):
        # Your logic should be all here
        if self.action in ('create', 'update', 'partial_update', 'destroy'):
            self.permission_classes = [IsSuperUser, ]
        else:
            self.permission_classes = [AllowAny, ]

        return super(EventModelView, self).get_permissions()

    @action(detail=False, methods=['GET'], name='Get detailed list')
    def detail_list(self, request, *args, **kwargs):
        queryset = EventModel.objects.all()
        serializer = EventModelSerializer(queryset, many=True)
        return Response(serializer.data)
