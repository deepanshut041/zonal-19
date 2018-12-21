from django.db import models, transaction
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

class EventModel(models.Model):
    name = models.CharField(max_length=130, null=False)
    details = models.TextField(null=True)
    rules = models.TextField(null=True)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    venue = models.CharField(max_length=130, null=False)
    faculty_name = models.CharField(max_length=130, null=False)
    department = models.CharField(max_length=130, null=False)
    maxp = models.IntegerField(default=6, null=False)

    def __str__(self):
        return str(self.name)

class EventCoordinatorModel(models.Model):
    name = models.CharField(max_length=130, null=False)
    img_url = models.CharField(max_length=200, null=True)
    phn_no = models.BigIntegerField(null=True)
    branch = models.CharField(max_length=30, null=False)
    year = models.IntegerField(default=3)
    event = models.ForeignKey(EventModel, on_delete=models.CASCADE, related_name="coordinators")

    def __str__(self):
        return str(self.name + " - " + self.branch + " - " + self.year)

class EventRegistrationModel(models.Model):
    college_name = models.CharField(max_length=130, null=False)
    college_code = models.CharField(max_length=10, null=False)
    faculty_name = models.CharField(max_length=130, null=False)
    faculty_designation = models.CharField(max_length=130, null=False)
    faculty_phn_no = models.BigIntegerField(null=False)
    faculty_email = models.EmailField(null=False)
    event = models.ForeignKey(EventModel, on_delete=models.CASCADE, related_name="events")

    def __str__(self):
        return str(self.college_code + " - " + self.college_name)
    
    class Meta:
        unique_together = ('college_code', 'event')

    @transaction.atomic
    def do_registration(self, data, participants, send_email=True):
        """
        Create a new registration and its associated ``EventParticipantModel``.
        Also, send mail to faculty.
        """
        
        # create instance of model
        m = EventRegistrationModel(**data)
        m.save()

        for participant in participants:
            participant['registration'] = m.pk
            EventParticipantModel.objects.create_participant(data=participant, send_email=True)

        if send_email:
            self.send_email(data, data.get('faculty_email'))

        return m

    def send_email(self, data, email):
        """
        Sends an verification email to particpant.
        """
        subject = "Registration Mail"

        message = "Succesfully registerded"

        msg = EmailMultiAlternatives(subject, "", settings.DEFAULT_FROM_EMAIL, [email])
        msg.attach_alternative(message, "text/html")
        msg.send()

class EventParticipantModel(models.Model):
    name = models.CharField(max_length=130, null=False)
    fathers_name = models.CharField(max_length=130, null=False)
    university_roll = models.CharField(max_length=20, null=False)
    branch = models.CharField(max_length=30, null=False)
    year = models.IntegerField(default=0, null=False)
    gender = models.CharField(max_length=20, null=False)
    aadhar_no = models.CharField(max_length=20, null=False)
    phn_no = models.BigIntegerField(max_length=20, null=False)
    email = models.EmailField(null=False)
    registration_id = models.CharField(max_length=130, null=True)
    registration = models.ForeignKey(EventRegistrationModel, on_delete=models.CASCADE, related_name="participants")

    def __str__(self):
        return str(self.name + " - " + self.university_roll)
    
    @transaction.atomic
    def create_participant(self, data, send_email=True):
        """
        Create a new participant.
        Also, send mail to each student with registration id.
        """
        
        # create instance of model
        m = EventParticipantModel(**data)
        m.save()

        if send_email:
            self.send_email(data, data.get('email'))

        return m
    
    def send_email(self, data, email):
        """
        Sends an verification email to particpant.
        """
        subject = "Registration Mail"

        message = "Succesfully registerded"

        msg = EmailMultiAlternatives(subject, "", settings.DEFAULT_FROM_EMAIL, [email])
        msg.attach_alternative(message, "text/html")
        msg.send()