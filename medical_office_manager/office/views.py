from django.shortcuts import redirect, render
from django.http import HttpRequest, HttpResponse
from .models import Patient
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from django.db.models import Q
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
    
    if(request.method == "POST"):
        post_data = request.POST
        
        name = post_data.get('name')
        date_of_birth = post_data.get('date_of_birth')
        CPF = post_data.get('CPF')
        phone = post_data.get('phone')
        
        errors = get_errors(name, date_of_birth, CPF, phone)
        has_errors = len(errors) != 0
        
        print("has errors", has_errors)        
        if (has_errors):
            context = {
                "errors": errors,
                "name" : name,
                "date_of_birth" : date_of_birth,
                "CPF" : CPF,
                "phone" : phone
            }
            
            return render(request, 'office/register_patient.html', context)
        
        else:                
            Patient.objects.create(name = name, date_of_birth = date_of_birth, CPF = CPF, phone = phone)
            
            return redirect('office:list_patients_assistant')
                              
    return render(request, 'office/register_patient.html')


def is_cpf_valid(cpf: str):
    result = False

    if (len(cpf) == 11):

        digitos = [int(char_digit) for char_digit in cpf]

        # obtendo primeiro digito verificador
        soma1 = 0
        index2 = 0

        for index1 in range(10, 1, -1):
            produto = index1 * digitos[index2]
            soma1 += produto
            index2 += 1
            
        resto1 = soma1 % 11

        digitoVerificador1 = None

        if (resto1 <2):
            digitoVerificador1 = 0
        else:
            digitoVerificador1 = 11 - resto1
        
        # obtendo segundo digito verificador    
        soma2 = 0
        index2 = 0
        for index1 in range (11, 1, -1):
            produto = index1 * digitos[index2]
            soma2 += produto
            index2 += 1
                    
        resto2 = soma2 % 11
        
        digitoVerificador2 = None
        if (resto2 < 2):
            digitoVerificador2 = 0
        else:
            digitoVerificador2 = 11 - resto2
        
        result = digitoVerificador1 == digitos[9] and digitoVerificador2 == digitos[10]
    
    return result

def get_errors(name, date_of_birth, CPF, phone):
    errors = {}

    if (name == "" or CPF == ""):
        errors["empty_fields"] = "Preencha todos os campos obrigatórios!"
        
    
    if (CPF != "" and is_cpf_valid(CPF) == False):
        errors["invalid_cpf"] = "CPF inválido!"
        
        
    if(len(Patient.objects.filter(CPF = CPF)) != 0):
        errors["repeated_cpf"] = "CPF já previamente cadastrado no sistema!"
  
    return errors 