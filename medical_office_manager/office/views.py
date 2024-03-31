from django.shortcuts import redirect, render
from django.http import HttpRequest, HttpResponse
from .models import Patient
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from django.db.models import F, Q
from . decorators import assistant_required, doctor_required

# Create your views here.

def identify_user_group(request):
    user_id = request.user.id
    group = Group.objects.filter(Q(user=user_id))[0]

    return group.name


@login_required
def home_router(request: HttpRequest):
    user_group = identify_user_group(request)

    if(user_group == "assistentes"):
        return home_assistant(request)
    elif (user_group == "médicos"):
        return home_doctor(request)
    else:
        return HttpResponse("Você não está logado")
    
    
@login_required
@doctor_required
def home_doctor(request):
        
    return render(request, 'office/home_doctor.html')

@login_required
@assistant_required
def home_assistant(request):
    return render(request, 'office/home_assistant.html')


@login_required
@doctor_required
def list_patients_for_doctor(request):
   
    patients = {
        'patients': Patient.objects.all()
    }
      
    return render(request, 'office/list_patients_doctor.html', context = patients)


@login_required
@assistant_required
def list_patients_for_assistant(request):
   
    patients = {
        'patients': Patient.objects.all()
    }
      
    return render(request, 'office/list_patients_assistant.html', context = patients)


@login_required
@assistant_required
def register_patient(request):
    # caso o usuário não seja assistente, deve informar erro (403)
        
    if(request.method == "POST"):
        post_data = request.POST
        
        name = post_data.get('name')
        date_of_birth = post_data.get('date_of_birth')
        CPF = post_data.get('CPF')
        phone = post_data.get('phone')
        
        Patient.objects.create(name = name, date_of_birth = date_of_birth, CPF = CPF, phone = phone)
        
        #return redirect('/office/list_patients_assistant/')
        return redirect('office:list_patients_assistant')
                      
    return render(request, 'office/register_patient.html')


