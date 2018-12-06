from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.db.models import ManyToOneRel, ForeignKey, OneToOneField

MySpecialAdmin = lambda model: type('SubClass'+model.__name__, (admin.ModelAdmin,), {
    'list_display': [x.name for x in model._meta.fields],
    'list_select_related': [x.name for x in model._meta.fields if isinstance(x, (ManyToOneRel, ForeignKey, OneToOneField,))]
})

from .models.test import TestModel

admin.site.register(TestModel,  MySpecialAdmin(TestModel))