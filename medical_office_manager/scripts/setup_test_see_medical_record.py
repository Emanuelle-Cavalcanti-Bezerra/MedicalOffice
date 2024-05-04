import traceback 
import base_scripts

try:    
    base_scripts.clear_all_data()
    base_scripts.add_doctor()
    base_scripts.add_patient()
    
except:
    print("ERRO*********************************")
    #traceback.print_exception()
    print("ERRO*********************************")
    traceback.print_stack()
    print("ERRO*********************************")
    traceback.print_exc()
    print("ERRO*********************************")
    #traceback.print_last()
    print("FIM*********************************")
    quit(10)
    