from rest_framework import serializers
from ..models.events import EventModel, EventCoordinatorModel, EventParticipantModel, EventRegistrationModel

class EventShortSerializer(serializers.ModelSerializer):
    class Meta:
        models = EventModel
        fields = ("id", "name", "date", "time", "venue", "maxp")

class EventModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventModel
        fields = '__all__'

class EventCoordinatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCoordinatorModel
        fields = '__all__'

class EventDetailSerializer(serializers.ModelSerializer):
    coordinators = EventCoordinatorSerializer(many=True)
    class Meta:
        model = EventModel
        fields = ("id", "name", "details", "rules", "date", "time", "venue", "faculty_name", "department", "coordinators", "maxp")


class EventParticipantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventParticipantModel
        fields = '__all__'

class EventRegistrationSerializer(serializers.ModelSerializer):
    participants = EventParticipantsSerializer()
    class Meta:
        model = EventRegistrationModel
        fields = ("participants", "college_name", "college_code", "faculty_name", "faculty_designation", "faculty_phn_no", "faculty_email", "event")

    def create(self, validated_data):

        registration_data = {
            'college_name': validated_data.get("college_name"),
            'college_code': validated_data.get("college_code"),
            'faculty_name': validated_data.get("faculty_name"),
            'faculty_designation': validated_data.get("faculty_designation"),
            'faculty_phn_no': validated_data.get("faculty_phn_no"),
            'faculty_email': validated_data.get("faculty_email"),
            'event': validated_data.get("event")
            }
        event = EventModel.objects.get(pk=validated_data.get("event"))
        event_data = EventShortSerializer(event)

        participants = validated_data.get("participants")

        if not participants:
            raise serializers.ValidationError("No Paticpants provided.")
        if len(participants) > event_data['maxp']:
            raise serializers.ValidationError("Paticpants exceeds provided limit")

        EventRegistrationModel.objects.do_registration(registration_data, participants, True)
        
        return validated_data
