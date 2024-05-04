from django.db import models
from django.contrib.auth.models import User, Group

# Create your models here.
  
class MyGroup(Group):
    pass

class MyUser(User):
    pass

       
class Patient(models.Model):

    name = models.CharField(max_length = 200, null = True)
    date_of_birth = models.DateField(null = True, blank = True)
    CPF = models.CharField(max_length = 11, null = True)
    phone = models.CharField(max_length = 200, null = True)
            
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return f'{self.name} (CPF: {self.CPF})'
    
            
class Appointment(models.Model):
    date = models.DateField(null = True, blank = True)
    time = models.TimeField(null = True, blank = True)
    patient = models.ForeignKey(Patient, on_delete = models.DO_NOTHING, null = True)
    
    class Meta:
        ordering = ['date', 'time']
    
    def __str__(self):
        return f'{self.date} - {self.time} - {self.patient}'
    
    
class MedicalRecordEntry(models.Model):
    content = models.CharField(max_length = 2000, null = True)
    appointment = models.ForeignKey(Appointment, on_delete = models.SET_NULL, null = True)
    patient = models.ForeignKey(Patient, on_delete = models.SET_NULL, null = True)
            
    def __str__(self):
        return f'{self.appointment.date}\n{self.content}'