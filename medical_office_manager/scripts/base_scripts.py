import sqlite3 as sql

dbpath = "/home/runner/work/MedicalOffice/MedicalOffice/medical_office_manager/db.sqlite3"

def clear_all_data():
    connection = sql.connect(dbpath)
    cursor = connection.cursor()
    connection.row_factory = sql.Row

    cursor.execute("DELETE FROM auth_group")
    cursor.execute("DELETE FROM auth_user")
    cursor.execute("DELETE FROM auth_user_groups")
    cursor.execute("DELETE FROM office_patient")
    cursor.execute("DELETE FROM office_appointment")
    cursor.execute("DELETE FROM office_medicalrecordentry")
    
    connection.commit()
    
def add_doctor():
    connection = sql.connect(dbpath)
    cursor = connection.cursor()
    connection.row_factory = sql.Row

    cursor.execute("INSERT INTO auth_group (name) VALUES ('médicos')")
    group_id = cursor.lastrowid

    cursor.execute("INSERT INTO auth_user (password, username, email, is_superuser, last_name, is_staff, is_active, date_joined, first_name) VALUES ('pbkdf2_sha256$600000$pBn6brnFz95LZWhw423oQy$c1irwtMTw9UpnxaKsa0VfG/dgNsOzFmfEYH0aDYQBrk=', 'medico1', '', 0, '', 0, 1, '2024-05-04 03:13:38.301481', '')")
    doctor_id = cursor.lastrowid

    cursor.execute(f"INSERT INTO auth_user_groups (user_id, group_id) VALUES ({doctor_id}, {group_id})")

    connection.commit()
    
     
def add_assistant():
    connection = sql.connect(dbpath)
    cursor = connection.cursor()
    connection.row_factory = sql.Row

    cursor.execute("INSERT INTO auth_group (name) VALUES ('assistentes')")
    group_id = cursor.lastrowid

    cursor.execute("INSERT INTO auth_user (password, username, email, is_superuser, last_name, is_staff, is_active, date_joined, first_name) VALUES ('pbkdf2_sha256$600000$pBn6brnFz95LZWhw423oQy$c1irwtMTw9UpnxaKsa0VfG/dgNsOzFmfEYH0aDYQBrk=', 'assistente1', '', 0, '', 0, 1, '2024-05-04 03:13:38.301481', '')")
    assistant_id = cursor.lastrowid

    cursor.execute(f"INSERT INTO auth_user_groups (user_id, group_id) VALUES ({assistant_id}, {group_id})")

    connection.commit()


     
def add_patient():
    connection = sql.connect(dbpath)
    cursor = connection.cursor()
    connection.row_factory = sql.Row

    cursor.execute("INSERT INTO office_patient (name, date_of_birth, CPF, phone) VALUES ('João Dantas', '2002-07-17', '02367016062', '35351587')")

    connection.commit()

