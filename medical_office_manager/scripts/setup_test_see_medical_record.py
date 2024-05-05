import base_scripts

try:    
    base_scripts.clear_all_data()
    base_scripts.add_doctor()
    base_scripts.add_patient('João Dantas', '2002-07-17', '02367016062', '35351587')
    
except Exception as error:
    print("ERRO*********************************")
    print("ERRO:", error)
    print("FIM*********************************")
    quit(10)
    