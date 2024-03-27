from django.shortcuts import redirect, render
from django.http import HttpRequest
from django.urls import reverse
from .models import User, Patient
from django.contrib.auth.decorators import login_required

# Create your views here.

def create_home_doctor(request):
    return render(request, 'office/home_doctor.html')

@login_required
def create_home_assistant(request):
    return render(request, 'office/home_assistant.html')

@login_required
def list_patients(request):
   
    patients = {
        'patients': Patient.objects.all()
    }
      
    return render(request, 'office/list_patients.html', context = patients)


@login_required
def register_patient(request):
    if(request.method == "POST"):
    
        post_data = request.POST
        
        name = post_data.get('name')
        date_of_birth = post_data.get('date_of_birth')
        CPF = post_data.get('CPF')
        phone = post_data.get('phone')
        
        Patient.objects.create(name = name, date_of_birth = date_of_birth, CPF = CPF, phone = phone)
        
        #return redirect('/office/list_patients/')
        return redirect('office:list_patients')

    
    return render(request, 'office/register_patient.html')