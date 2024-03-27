from django.shortcuts import redirect, render
from django.http import HttpRequest
from django.urls import reverse
from .models import User, Patient
from django.contrib.auth.decorators import login_required
from django.views import View

# Create your views here.

'''class CreateQuestionView(View):
    def get(self, request):
        return render(request, 'forum/create_question.html')
    
    def post(self, request):
        if request.user.is_authenticated:
            username = request.user.username
        else:
            username = 'anonymous'
        title = request.POST.get('title')
        details = request.POST.get('details')
        have_tried = request.POST.get('have_tried')
        created_date = timezone.now()
        
        question = Question(title=title, details=details, have_tried=have_tried, created_date=created_date, username=username)
        question.save()

        return redirect(reverse('forum:detail', args=[question.id]))'''

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
    #return redirect ('/office/list_patients/', context = patients)
    #return redirect(reverse('office:list_patients'), context = patients)
    #return redirect(reverse('forum:detail', args=[question.id]))

@login_required
def register_patient(request):
    if(request.method == "POST"):
    
        post_data = request.POST
        
        name = post_data.get('name')
        date_of_birth = post_data.get('date_of_birth')
        CPF = post_data.get('CPF')
        phone = post_data.get('phone')
        
        #new_patient.update_patient(name, date_of_birth, CPF, phone)
        Patient.objects.create(name = name, date_of_birth = date_of_birth, CPF = CPF, phone = phone)
        
        return redirect('/office/list_patients/')

    
    return render(request, 'office/register_patient.html')