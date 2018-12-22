from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.db.models import ManyToOneRel, ForeignKey, OneToOneField


MySpecialAdmin = lambda model: type('SubClass'+model.__name__, (admin.ModelAdmin,), {
    'list_display': [x.name for x in model._meta.fields],
    'list_select_related': [x.name for x in model._meta.fields if isinstance(x, (ManyToOneRel, ForeignKey, OneToOneField,))]
})

from .models.accounts import UserProfile
from .models.events import EventModel, EventCoordinatorModel, EventRegistrationModel, EventParticipantModel

admin.site.register(EventModel,  MySpecialAdmin(EventModel))
admin.site.register(EventCoordinatorModel, MySpecialAdmin(EventCoordinatorModel))
admin.site.register(EventRegistrationModel,  MySpecialAdmin(EventRegistrationModel))
admin.site.register(EventParticipantModel, MySpecialAdmin(EventParticipantModel))

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'email', 'is_active', 'has_email_verified')

    def email(self, profile):
        return profile.user.email

    def name(self, profile):
        return profile.user.first_name + " " + profile.user.last_name

    def is_active(self, profile):
        return profile.user.is_active
