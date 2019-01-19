from rest_framework import serializers
from ..models.events import EventModel, EventCoordinatorModel, EventParticipantModel, EventRegistrationModel, EventFacultyModel
from django.forms.models import model_to_dict
from rest_framework_recaptcha.fields import ReCaptchaField

class EventShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventModel
        fields = ("id", "name", "date", "time", "venue", "maxp", "color")

class EventModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventModel
        fields = '__all__'

class EventCoordinatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCoordinatorModel
        fields = '__all__'

class EventFacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventFacultyModel
        fields = '__all__'

class EventDetailSerializer(serializers.ModelSerializer):
    coordinators = serializers.SerializerMethodField()
    faculties = serializers.SerializerMethodField()

    def get_faculties(self, obj):
         ordered_queryset = EventFacultyModel.objects.filter(event_id=obj.id).order_by('view_priority')
         return EventFacultySerializer(ordered_queryset, many=True, context=self.context).data

    def get_coordinators(self, obj):
         ordered_queryset = EventCoordinatorModel.objects.filter(event_id=obj.id).order_by('-year')
         return EventCoordinatorSerializer(ordered_queryset, many=True, context=self.context).data

    class Meta:
        model = EventModel
        fields = ("id", "name", "details", "rules", "date", "time", "venue", "department", "coordinators", "maxp", "image", "color", "faculties")


class EventParticipantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventParticipantModel
        fields = '__all__'

class EventParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventParticipantModel
        exclude = ["registration"]

class EventRegistrationSerializer(serializers.ModelSerializer):
    participants = EventParticipantSerializer(many=True)
    recaptcha = ReCaptchaField(error_messages={
            "invalid-input-response": "reCAPTCHA token is invalid.",
            "idiot": "Don't try to hack (tum se na ho paayga",
        })
    class Meta:
        model = EventRegistrationModel
        fields = ("participants", "college_name", "college_code", "faculty_name",
         "faculty_designation", "faculty_phn_no", "faculty_email", "event", "recaptcha", "faculty_gender")

    def create(self, validated_data):

        registration_data = {
            'college_name': validated_data.get("college_name"),
            'college_code': validated_data.get("college_code"),
            'faculty_name': validated_data.get("faculty_name"),
            'faculty_designation': validated_data.get("faculty_designation"),
            'faculty_phn_no': validated_data.get("faculty_phn_no"),
            'faculty_email': validated_data.get("faculty_email"),
            'event': validated_data.get("event"),
            'faculty_gender': validated_data.get("faculty_gender")
            }
        event = validated_data.get("event")
        dict_event = model_to_dict( event )
        participants = validated_data.get("participants")

        if not participants or len(participants) == 0:
            raise serializers.ValidationError("No Paticpants provided.")
        if len(participants) > dict_event['maxp']:
            raise serializers.ValidationError("Paticpants exceeds provided limit")

        EventRegistrationModel.objects.do_registration(registration_data, participants, False)
        
        return validated_data

class EventParticipantsPartialSerializer(serializers.ModelSerializer):
    college_name = serializers.CharField(source='registration.college_name', read_only=True) 
    class Meta:
        model = EventParticipantModel
        fields = ("college_name", "name", "university_roll", "year", "branch", "gender", "phn_no")