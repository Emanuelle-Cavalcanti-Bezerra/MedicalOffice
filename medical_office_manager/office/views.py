from django.shortcuts import render
from django.http import HttpRequest

from .models import User, Patient

# Create your views here.

def create_home_doctor(request):
    return render(request, 'office/home_doctor.html')


def create_home_assistant(request):
    return render(request, 'office/home_assistant.html')


def list_patients(request):
    new_patient = Patient()
    
    post_data = request.POST
    
    name = post_data.get('name')
    date_of_birth = post_data.get('date_of_birth')
    CPF = post_data.get('CPF')
    phone = post_data.get('phone')
    
    new_patient.update_patient(name, date_of_birth, CPF, phone)
    
    if (new_patient != None):
        new_patient.save()
    
    patients = {
        'patients': Patient.objects.all()
    }
      
    return render(request, 'office/list_patients.html', context = patients)


def register_patient(request):

    
    return render(request, 'office/register_patient.html')