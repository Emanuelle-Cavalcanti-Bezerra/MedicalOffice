from django.contrib import admin
from .models import Patient, Appointment, MedicalRecordEntry, MyGroup, MyUser

# Register your models here.

admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(MedicalRecordEntry)

admin.site.register(MyUser)

from django.contrib.auth.admin import GroupAdmin
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _

admin.site.unregister(Group)

@admin.register(MyGroup)
class CustomGroupAdmin(GroupAdmin):
    fieldsets = (
        (None, {'fields': ('name', 'permissions')}),
        (_('Description'), {'fields': ('description',)}),
    )

