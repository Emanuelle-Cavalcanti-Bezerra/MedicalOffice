from django.urls import path
from . import views

app_name = 'office'

urlpatterns = [
    path('home_router/', views.home_router, name = 'home_router'),
    path('home_doctor/', views.home_doctor, name = 'home_doctor'),
    path('home_assistant/', views.home_assistant, name = 'home_assistant'),
    path('list_patients_assistant/', views.list_patients_for_assistant, name = 'list_patients_assistant'),
    path('list_patients_doctor/', views.list_patients_for_doctor, name = 'list_patients_doctor'),
    path('register_patient/', views.register_patient, name = 'register_patient'),
    path('patient_details_assistant/<int:patient_id>/', views.patient_details_assistant, name = 'patient_details_assistant'),
    path('patient_details_assistant/<int:patient_id>/edit_patient/<int:patient_id2>', views.edit_patient, name = 'edit_patient'),
]
