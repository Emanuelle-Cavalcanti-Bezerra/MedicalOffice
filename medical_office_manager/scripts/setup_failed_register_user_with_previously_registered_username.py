import base_scripts

try:    
    base_scripts.clear_all_data()
    base_scripts.add_manager()
    base_scripts.add_doctor()
    
except Exception as error:
    print("ERRO*********************************")
    print("ERRO:", error)
    print("FIM*********************************")
    quit(10)