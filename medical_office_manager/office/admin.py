from django.contrib import admin
from .models import Patient, Appointment, MedicalRecordEntry, Document

# Register your models here.

admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(MedicalRecordEntry)
admin.site.register(Document)

