from typing import Any
from django.db import models

# Create your models here.

      
class User(models.Model):
    name = models.CharField(max_length = 200, null = True)
    role = models.CharField(max_length = 200, null = True) 
        
class Patient(models.Model):

    name = models.CharField(max_length = 200, null = True)
    date_of_birth = models.DateField(null = True, blank = True)
    CPF = models.CharField(max_length = 11, null = True)
    phone = models.CharField(max_length = 200, null = True)
        
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return f'{self.name} ({self.CPF})'
        
