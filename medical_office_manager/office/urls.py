from django.urls import path
from . import views

app_name = 'office'

urlpatterns = [
    path('home_router/', views.create_home_router, name = 'home_router'),
    path('home_doctor/', views.create_home_doctor, name = 'home_doctor'),
    path('home_assistant/', views.create_home_assistant, name = 'home_assistant'),
    path('list_patients_assistant/', views.list_patients_for_assistant, name = 'list_patients_assistant'),
    path('list_patients_doctor/', views.list_patients_for_doctor, name = 'list_patients_doctor'),
    path('register_patient/', views.register_patient, name = 'register_patient'),
]
