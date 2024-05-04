import datetime
from time import gmtime, strftime
from django.shortcuts import redirect, render
from django.http import HttpRequest, HttpResponse
from .models import Patient, Appointment, MedicalRecordEntry
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group, User
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
    patient_filtered = request.GET.get('patient_filtered')
    patients = None
    
    if patient_filtered:
        patients = {
            'patients': Patient.objects.filter(CPF = patient_filtered) | Patient.objects.filter(name__icontains = patient_filtered)
        }
    else:   
        patients = {
            'patients': Patient.objects.all()
        }
      
    return render(request, 'office/list_patients_doctor.html', context = patients)


@login_required
@assistant_required
def list_patients_for_assistant(request):
    patient_filtered = request.GET.get('patient_filtered')
    patients = None
    
    if patient_filtered:
        patients = {
            'patients': Patient.objects.filter(CPF = patient_filtered) | Patient.objects.filter(name__icontains = patient_filtered)
        }
    else:   
        patients = {
            'patients': Patient.objects.all()
        }
      
    return render(request, 'office/list_patients_assistant.html', context = patients)


@login_required
@doctor_required
def patient_details_doctor(request: HttpRequest, patient_id):
    patient = Patient.objects.filter(id=patient_id)[0]
    
    birth_date = format_date(patient.date_of_birth)

    context = {'patient': patient,
               'birth_date': birth_date}
    
    return render(request, 'office/patient_details_doctor.html', context)


@login_required
@doctor_required
def patient_medical_record(request: HttpRequest, patient_id):
    patient = Patient.objects.filter(id=patient_id)[0]
    
    birth_date = format_date(patient.date_of_birth)
   
    medical_record_entries = patient.medicalrecordentry_set.all()
    
    context = {'patient': patient,
               'birth_date': birth_date,
               'medical_record_entries': medical_record_entries
               }
    
    return render(request, 'office/patient_medical_record.html', context)


@login_required
@assistant_required
def register_patient(request):
    
    if(request.method == "POST"):
        post_data = request.POST
        
        name = post_data.get('name').strip()
        date_of_birth = post_data.get('date_of_birth')
        CPF = post_data.get('CPF').strip().replace(".", "").replace("-", "")
        phone = post_data.get('phone').strip()
        
        errors = get_errors_on_register_patient(name, date_of_birth, CPF, phone)
        has_errors = len(errors) != 0
                       
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


@login_required
@assistant_required
def patient_details_assistant(request: HttpRequest, patient_id):
    patient = Patient.objects.filter(id=patient_id)[0]
    birth_date = str(patient.date_of_birth)

    context = {'patient': patient,
               'birth_date': birth_date}
    
    return render(request, 'office/patient_details_assistant.html', context)   

@login_required
@assistant_required
def edit_patient(request: HttpRequest, patient_id):
    if(request.method == "POST"):
        post_data = request.POST
        
        patient = Patient.objects.get(id=patient_id)
        previews_cpf = patient.CPF
        
        name = post_data.get('name')
        date_of_birth = post_data.get('date_of_birth')
        CPF = post_data.get('CPF')
        phone = post_data.get('phone')
        
        errors = get_errors_on_register_patient(name, date_of_birth, CPF, phone, previews_cpf)
        has_errors = len(errors) != 0
                      
        if (has_errors):
            edited_patient = {
                'id': patient_id,
                'name': name,
                'CPF': CPF,
                'phone': phone
            }
            
            context = {
                "errors": errors,
                "birth_date" : date_of_birth,
                "patient": edited_patient
            }
            
            return render(request, 'office/patient_details_assistant.html', context)
        
        else:                
            patient.name = name
            patient.date_of_birth = date_of_birth
            patient.CPF = CPF
            patient.phone = phone
            patient.save()
            
            return redirect('office:list_patients_assistant')
                              
    return render(request, 'office/patient_details_assistant.html')
 
 
@login_required
@assistant_required
def delete_patient(request: HttpRequest, patient_id): 
    print("patient id: " + str(patient_id))
    patient = Patient.objects.filter(id=patient_id)[0]
    #patient = Patient.objects.all()[patient_id]
    #patient = Patient.objects.get(id=patient_id)
        
    context = {'patient': patient}
    
      
    return render(request, 'office/delete_patient.html', context)

@login_required
@assistant_required    
def patient_successfully_deleted(request: HttpRequest, patient_id):
    
    patient = Patient.objects.filter(id=patient_id)[0]
    
    context = {'patient': patient}
    
    patient.delete()
    
    return render(request, 'office/patient_successfully_deleted.html', context)


@login_required
@assistant_required    
def appointments_list_assistant(request: HttpRequest, date):
    date_filter = date
    
    if(request.method == "POST"):
        post_data = request.POST
        date_filter = post_data.get('appointment_date')
    
    appointments = Appointment.objects.filter(date=date_filter)
    
    template_appointments = []
    for index in range(8,19):
        template_appointment = []
        if (len(appointments) == 0):
            template_appointment = [f'{index:02d}:00', "DISPONÍVEL"]
        else: 
            for appointment in appointments:
                appointment_hour = str(int(str(appointment.time).split(":")[0]))
                
                if (appointment_hour == str(index)):
                    template_appointment = [f'{index:02d}:00', appointment.patient.name, appointment.id]
                    break
                elif (appointment_hour != str(index)):
                    template_appointment = [f'{index:02d}:00', "DISPONÍVEL"]
        
        template_appointments.append(template_appointment)
             
    context = {
        'appointments': template_appointments,
        'date': format_date(date_filter),
        'date_default': str(date_filter)
    }
    
    return render(request, 'office/appointments_list_assistant.html', context)


@login_required
@doctor_required    
def appointments_list_doctor(request: HttpRequest, date):
    date_filter = date
    
    if(request.method == "POST"):
        post_data = request.POST
        date_filter = post_data.get('appointment_date')
    
    appointments = Appointment.objects.filter(date=date_filter)
    
    template_appointments = []
    for index in range(8,19):
        template_appointment = []
        if (len(appointments) == 0):
            template_appointment = [f'{index:02d}:00', "DISPONÍVEL"]
        else: 
            for appointment in appointments:
                appointment_hour = str(int(str(appointment.time).split(":")[0]))
                
                if (appointment_hour == str(index)):
                    template_appointment = [f'{index:02d}:00', appointment.patient.name, appointment.id]
                    break
                elif (appointment_hour != str(index)):
                    template_appointment = [f'{index:02d}:00', "DISPONÍVEL"]
        
        template_appointments.append(template_appointment)
        
    context = {
        'appointments': template_appointments,
        'date': format_date(date_filter),
        'date_default': str(date_filter)
    }
    
    return render(request, 'office/appointments_list_doctor.html', context)


@login_required
@assistant_required    
def schedule_appointment(request, date_time):
    date = date_time.split(" ")[0]
    time = date_time.split(" ")[1]
    patients = Patient.objects.all()
    is_future_date_time = (date > str(datetime.date.today())) or ((date == str(datetime.date.today())) and (time > strftime("%H:%M:%S")))
           
    context = {
        'date_display': format_date(date),
        'date_url': date,
        'time': time,
        'patients': patients,
        'is_future_date_time': is_future_date_time
    }
            
    return render(request, 'office/schedule_appointment.html', context)  


@login_required
@assistant_required 
def appointment_successfully_scheduled(request, date_time):
    date = date_time.split(" ")[0]
    time = date_time.split(" ")[1]
    cpf = None
        
    if(request.method == "POST"):
        post_data = request.POST
        cpf = post_data.get('patient_to_be_selected')
        
    patient = Patient.objects.get(CPF=cpf)
    
    Appointment.objects.create(date = date, time=time, patient = patient)
    
    context = {
        'date': format_date(date),
        'date_url': date,
        'time': time, 
        'patient': patient
    }
    
    return render(request, 'office/appointment_successfully_scheduled.html', context)


@login_required
@assistant_required 
def unschedule_appointment(request, appointment_id):
    appointment = Appointment.objects.get(id=appointment_id)
    is_future_date_time = (str(appointment.date) > str(datetime.date.today())) or ((str(appointment.date) == str(datetime.date.today())) and (str(appointment.time) > strftime("%H:%M:%S")))
    
    context = {
        'appointment': appointment,
        'is_future_date_time': is_future_date_time
    }
       
    return render(request, 'office/unschedule_appointment.html', context)


@login_required
@assistant_required 
def unschedule_appointment_successfully(request, appointment_id):
   
    appointment = Appointment.objects.get(id=appointment_id)
           
    context = {
        'appointment': appointment
    }
    
    appointment.delete()
    
    return render(request, 'office/unschedule_appointment_successfully.html', context)


@login_required
@doctor_required 
def display_appointment_details(request, appointment_id):
    appointment = Appointment.objects.get(id=appointment_id)
        
    medical_record_entry = appointment.medicalrecordentry_set.all()
    
    if(request.method == "POST"):
        post_data = request.POST
        new_medical_record_entry_content = post_data.get('new_medical_record_entry')
      
        MedicalRecordEntry.objects.create(content = new_medical_record_entry_content, appointment = appointment, patient = appointment.patient)
        
        medical_record_entry = appointment.medicalrecordentry_set.all()
        
    context= {
        'appointment': appointment,
        'medical_record_entry': medical_record_entry,
    }
    
    return render(request, 'office/display_appointment_details.html', context)


def register_user(request):
    
    if(request.method == 'POST'):
        nome = request.POST.get('username').strip()
        email = request.POST.get('email').strip()
        grupo_name = request.POST.get('grupo')
        password = request.POST.get('password').strip()
        cfpassword = request.POST.get('cfpassword').strip()
        errors = {}
        user = None
        group = None
        context = {}
        
        print("*******GROUP NAME*********")
        print(grupo_name)
        
        if (nome == "" or email == "" or grupo_name == None or password == "" or cfpassword == ""):
            errors['empty_fields'] = "Preencha todos os campos obrigatórios!"
            print(errors['empty_fields'])
        
        elif(password != cfpassword):
            errors.update({'senhas_nao_conferem': "senhas não conferem!"})
            print(errors['senhas_nao_conferem'])
            
        elif(len(password) < 6):
            errors.update({'senha_menor_que_6_digitos': "senha deve ter 6 dígitos ou mais!!"})
            print(errors['senha_menor_que_6_digitos'])    
                   
        users_in_data_base = User.objects.filter(username=nome)
            
        if(users_in_data_base.exists()):
            errors.update({'username_ja_cadastrado': "Já existe usuário cadastrado com esse username. Escolha outro."})
            print(errors['username_ja_cadastrado'])   
        

        
        has_errors = len(errors) != 0
        if (has_errors):
            context = {
            'errors': errors
            }
            return render(request, 'office/register_user.html', context)
        
        else:
            my_groups_in_data = Group.objects.filter(name=grupo_name)
            print(f"##############EXISTE GROUP: {grupo_name}#######################")
            print(my_groups_in_data.exists())
            
            
            #teste = Group.objects.get(name=grupo_name)
            #print(teste)

            
            if((my_groups_in_data.exists())):
                group = Group.objects.filter(name=grupo_name)[0]
            else:
                group = Group.objects.create(name=grupo_name)

            user = User.objects.create_user(username = nome, email = email, password = password)
            
            # conexão entre as tabelas auth_user e auth_group
            user.groups.add(group)
            
            print("*******CADASTRO COM SUCESSO*********")
            print(f'USUÁRIO: {user.username}\nGROUP: {group.name}')
                    
            return redirect('login')
            #return HttpResponse('USUÁRIO CRIADO COM SUCESSO')
   
    return render (request, 'office/register_user.html')


def is_cpf_valid(cpf: str):
    result = False
    
    cpf = cpf.strip().replace(".", "").replace("-", "")

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


def format_date(date):
    date_str = str(date)
    date_splited = date_str.split("-")
    date_splited_inverted = date_splited[::-1]
    formated_date = ("/").join(date_splited_inverted)
    
    return formated_date


def get_errors_on_register_patient(name, date_of_birth, CPF, phone, previews_CPF = None):
    errors = {}

    if (name == "" or date_of_birth == "" or CPF == "" or phone == ""):
        errors["empty_fields"] = "Preencha todos os campos obrigatórios!"
        
    
    if (CPF != "" and is_cpf_valid(CPF) == False):
        errors["invalid_cpf"] = "CPF inválido!"
        
      
    is_cpf_available = len(Patient.objects.filter(CPF = CPF)) == 0 or CPF == previews_CPF
    if(not is_cpf_available):
        errors["repeated_cpf"] = "CPF já previamente cadastrado no sistema!"
  
    return errors 