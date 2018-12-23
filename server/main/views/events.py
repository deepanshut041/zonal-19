from rest_framework.viewsets import ModelViewSet, ViewSet
from django.http import Http404
from rest_framework import viewsets, mixins, serializers
from ..models.events import EventModel, EventCoordinatorModel, EventParticipantModel, EventRegistrationModel
from ..serializers.events import EventModelSerializer, EventDetailSerializer, EventShortSerializer, EventCoordinatorSerializer
from ..serializers.events import EventParticipantsSerializer, EventRegistrationSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny
from ..base.permissions import IsOwnerOrAdmin, IsSuperUser, IsOwnerOrStaff
from rest_framework import mixins
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

class EventModelView(ModelViewSet):
    queryset = EventModel.objects.all()
    serializer_class = EventModelSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_permissions(self):
        # Your logic should be all here
        if self.action in ('create', 'update', 'partial_update', 'destroy'):
            self.permission_classes = [IsSuperUser, IsAdminUser, ]
        else:
            self.permission_classes = [AllowAny, ]

        return super(EventModelView, self).get_permissions()

    @action(detail=False, methods=['GET'], name='Get detailed list')
    def detail_list(self, request, *args, **kwargs):
        queryset = EventModel.objects.all()
        serializer = EventDetailSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], name='Get detailed list')
    def short_list(self, request, *args, **kwargs):
        queryset = EventModel.objects.all()
        serializer = EventShortSerializer(queryset, many=True)
        return Response(serializer.data)

class EventCoordinatorView(ModelViewSet):
    queryset = EventCoordinatorModel.objects.all()
    serializer_class = EventCoordinatorSerializer

    def get_permissions(self):
        # Your logic should be all here
        if self.action in ('create', 'update', 'partial_update', 'destroy'):
            self.permission_classes = [IsSuperUser, IsAdminUser, ]
        else:
            self.permission_classes = [AllowAny, ]

        return super(EventCoordinatorView, self).get_permissions() 

class EventRegistrationView(ModelViewSet):
    queryset = EventRegistrationModel.objects.all()
    serializer_class = EventRegistrationSerializer

    def get_permissions(self):
        # Your logic should be all here
        if self.action in ('list', 'update', 'partial_update', 'destroy', 'retrieve'):
            self.permission_classes = [IsSuperUser, IsAdminUser, ]
        else:
            self.permission_classes = [AllowAny, ]

        return super(EventRegistrationView, self).get_permissions()

class EventParticipantView(ModelViewSet):
    queryset = EventParticipantModel.objects.all()
    serializer_class = EventParticipantsSerializer
    permission_classes = (IsAdminUser, IsSuperUser, )