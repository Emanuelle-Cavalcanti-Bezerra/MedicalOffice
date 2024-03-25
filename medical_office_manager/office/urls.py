from django.urls import path
from . import views

app_name = 'office'

urlpatterns = [
    path('home_doctor/', views.create_home_doctor, name = 'home_doctor'),
    path('home_assistant/', views.create_home_assistant, name = 'home_assistant'),
    path('list_patients/', views.list_patients, name = 'list_patients'),
    path('register_patient/', views.register_patient, name = 'register_patient'),
]
