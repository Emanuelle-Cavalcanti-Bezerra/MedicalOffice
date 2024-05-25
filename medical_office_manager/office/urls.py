from django.urls import path
from . import views

app_name = 'office'

urlpatterns = [
    path('home_router/', views.home_router, name = 'home_router'),
    path('home_manager/', views.home_manager, name = 'home_manager'),
    path('home_doctor/', views.home_doctor, name = 'home_doctor'),
    path('home_assistant/', views.home_assistant, name = 'home_assistant'),
    path('list_patients_assistant/', views.list_patients_for_assistant, name = 'list_patients_assistant'),
    path('list_patients_doctor/', views.list_patients_for_doctor, name = 'list_patients_doctor'),
    path('register_patient/', views.register_patient, name = 'register_patient'),
    path('patient_details_doctor/<int:patient_id>/', views.patient_details_doctor, name = 'patient_details_doctor'),
    path('patient_medical_record/<int:patient_id>/', views.patient_medical_record, name = 'patient_medical_record'),
    path('patient_details_assistant/<int:patient_id>/', views.patient_details_assistant, name = 'patient_details_assistant'),
    path('edit_patient/<int:patient_id>/', views.edit_patient, name = 'edit_patient'),
    path('delete_patient/<int:patient_id>/', views.delete_patient, name = 'delete_patient'),
    path('patient_successfully_deleted/<int:patient_id>/', views.patient_successfully_deleted, name = 'patient_successfully_deleted'),
    path('appointments_list_assistant/<str:date>/', views.appointments_list_assistant, name = 'appointments_list_assistant'),
    path('appointments_list_doctor/<str:date>/', views.appointments_list_doctor, name = 'appointments_list_doctor'),
    path('schedule_appointment/<str:date_time>/', views.schedule_appointment, name = 'schedule_appointment'),
    path('appointment_successfully_scheduled/<str:date_time>/', views.appointment_successfully_scheduled, name='appointment_successfully_scheduled'),
    path('unschedule_appointment/<int:appointment_id>/', views.unschedule_appointment, name = 'unschedule_appointment'),
    path('unschedule_appointment_successfully/<int:appointment_id>/', views.unschedule_appointment_successfully, name = 'unschedule_appointment_successfully'),
    path('display_appointment_details/<int:appointment_id>/', views.display_appointment_details, name='display_appointment_details'),
    path('register_user/', views.register_user, name='register_user'),
    path('add_document_to_appointment/<int:appointment_id>/', views.add_document_to_appointment, name='add_document_to_appointment'),
    path('edit_medical_record_entry/<int:appointment_id>/', views.edit_medical_record_entry, name='edit_medical_record_entry'),
    path('confirm_delete_document_from_appointment/<int:appointment_id>/<int:document_id>/', views.confirm_delete_document_from_appointment, name='confirm_delete_document_from_appointment'),
    path('delete_document_from_appointment/<int:appointment_id>/<int:document_id>/', views.delete_document_from_appointment, name='delete_document_from_appointment'),
    path('list_system_users/', views.list_system_users, name='list_system_users'),
    
 
]
