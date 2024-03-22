from typing import Any
from django.db import models

# Create your models here.

class Doctor(models.Model):
    
    def __init__(self, name):
        self.name = name


class Assistant(models.Model):
    
    def __init__(self, name):
        self.name = name
        
        
class Patient(models.Model):
    
    def __init__(self, name, birth_date, CPF, phone):
        self.name = name
        self.birth_date = birth_date
        self.CPF = CPF
        self.phone = phone
        
class Appointment(models.Model):
    def __init__(self, date, time, patient):
        self.date = date
        self.time = time
        self.patient = patient