from django.db import models, transaction
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.core.validators import RegexValidator

class EventModel(models.Model):
    name = models.CharField(max_length=130, null=False)
    details = models.TextField(null=True)
    rules = models.TextField(null=True)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    venue = models.CharField(max_length=130, null=False)
    faculty_name = models.CharField(max_length=130, null=False)
    faculty_image = models.ImageField(blank=False, null=False, upload_to = 'images/events/faculty/')
    department = models.CharField(max_length=130, null=False)
    maxp = models.IntegerField(default=6, null=False)
    image = models.ImageField(blank=False, null=False, upload_to = 'images/events/')
    color = models.CharField(max_length=10, null=False)

    def __str__(self):
        return str(self.name)



class EventCoordinatorModel(models.Model):
    name = models.CharField(max_length=130, null=False)
    image = models.ImageField(blank=False, null=False, upload_to = 'images/events/coordinators/')
    phn_no = models.CharField(null=False,max_length=10, validators=[RegexValidator(regex='^.{10}$', message='Length has to be 10', code='nomatch')])
    branch = models.CharField(max_length=30, null=False)
    year = models.IntegerField(default=3)
    event = models.ForeignKey(EventModel, on_delete=models.CASCADE, related_name="coordinators")

    def __str__(self):
        return str(self.name) + " - " + str(self.branch) + " - " + str(self.year)

class EventRegistrationManager(models.Manager):
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
            participant['registration'] = m
            EventParticipantModel.objects.create_participant(data=participant, send_email=False)

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

class EventRegistrationModel(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Others'),
    )
    college_name = models.CharField(max_length=130, null=False)
    college_code = models.CharField(max_length=10, null=False)
    faculty_name = models.CharField(max_length=50, null=False)
    faculty_designation = models.CharField(max_length=130, null=False)
    faculty_gender = models.CharField(max_length=10, null=False, choices=GENDER_CHOICES)
    faculty_phn_no = models.CharField(null=False,max_length=10, validators=[RegexValidator(regex='^.{10}$', message='Length has to be 10', code='nomatch')])
    faculty_email = models.EmailField(null=False)
    event = models.ForeignKey(EventModel, on_delete=models.CASCADE, related_name="events")

    objects = EventRegistrationManager()
    def __str__(self):
        return str(self.college_code + " - " + self.college_name)
    
    class Meta:
        unique_together = ('college_code', 'event')

class EventParticipantManager(models.Manager):
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

class EventParticipantModel(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Others'),
    )
    YEAR_CHOICES = (
        (1, '1st'),
        (2, '2nd'),
        (3, '3rd'),
        (4, '4th'),
        (5, '5th'),
    )

    name = models.CharField(max_length=50, null=False)
    fathers_name = models.CharField(max_length=50, null=False)
    university_roll = models.CharField(max_length=15, null=False)
    branch = models.CharField(max_length=50, null=False)
    year = models.IntegerField(default=0, null=False, choices=YEAR_CHOICES)
    gender = models.CharField(max_length=10, null=False, choices=GENDER_CHOICES)
    aadhar_no = models.CharField(null=False, max_length=12, validators=[RegexValidator(regex='^.{12}$', message='Length has to be 12', code='nomatch')])
    phn_no = models.CharField(null=False, max_length=10, validators=[RegexValidator(regex='^.{10}$', message='Length has to be 10', code='nomatch')])
    email = models.EmailField(null=False)
    regs_id = models.CharField(max_length=130, null=True)
    registration = models.ForeignKey(EventRegistrationModel, on_delete=models.CASCADE, related_name="participants")


    objects = EventParticipantManager()
    def __str__(self):
        return str(self.name + " - " + self.university_roll)
