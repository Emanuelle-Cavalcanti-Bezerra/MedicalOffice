from django.shortcuts import render
from django.http import HttpRequest

from .models import User, Patient

# Create your views here.

def create_home_doctor(request):
    return render(request, 'office/home_doctor.html')


def create_home_assistant(request):
    return render(request, 'office/home_assistant.html')


def list_patients(request):
    return render(request, 'office/list_patients.html')


def register_patient(request):
    return render(request, 'office/register_patient.html')