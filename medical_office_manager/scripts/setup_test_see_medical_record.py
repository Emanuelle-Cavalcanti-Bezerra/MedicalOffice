import time
import traceback 
import sqlite3 as sql

try:
    connection = sql.connect(r"C:\Users\emanu\Desktop\PYTHON\Django\MedicalOffice\medical_office_manager\db.sqlite3")
    cursor = connection.cursor()
    connection.row_factory = sql.Row

    cursor.execute("INSERT INTO auth_group (name) VALUES ('médicos')")

    cursor.execute("INSERT INTO auth_user (password, username, email, is_superuser, last_name, is_staff, is_active, date_joined, first_name) VALUES ('pbkdf2_sha256$600000$pBn6brnFz95LZWhw423oQy$c1irwtMTw9UpnxaKsa0VfG/dgNsOzFmfEYH0aDYQBrk=', 'medico1', '', 0, '', 0, 1, '2024-05-04 03:13:38.301481', '')")

    cursor.execute("INSERT INTO auth_user_groups (user_id, group_id) VALUES (1, 1)")

    connection.commit()
    time.sleep(2)
except:
    traceback.print_exc()
    print("FIM*********************************")
    quit(10)
    
    # 2024-05-04 03:13:38.301481
    # pbkdf2_sha256$600000$pBn6brnFz95LZWhw423oQy$c1irwtMTw9UpnxaKsa0VfG/dgNsOzFmfEYH0aDYQBrk=