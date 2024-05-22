import base_scripts

try:    
    base_scripts.clear_all_data()
    base_scripts.add_doctor()
    base_scripts.add_patient('João Dantas', '2002-07-17', '02367016062', '35351587')
    base_scripts.add_appointment('2024-05-17', '08:00:00','02367016062')
    base_scripts.add_medical_record_entry('entrada de teste para consulta de João Dantas em 17/05/2024', '2024-05-17', '08:00:00','02367016062')
    
except Exception as error:
    print("ERRO*********************************")
    print("ERRO:", error)
    print("FIM*********************************")
    quit(10)