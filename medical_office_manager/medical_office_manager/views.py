from django.shortcuts import render
from django.contrib.auth import logout

def login_view(request):
    return render(request, 'registration/login.html')

def logout_view(request):
    logout(request)
    
    return render(request, 'registration/logged_out.html')