import base_scripts

try:    
    base_scripts.clear_all_data()
    base_scripts.add_doctor()
    base_scripts.add_patient()
    
except Exception as error:
    print("ERRO*********************************")
    print("ERRO:", error)
    print("FIM*********************************")
    quit(10)
    