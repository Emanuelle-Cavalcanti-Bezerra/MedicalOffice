import base_scripts
try:    
    base_scripts.clear_all_data()
    
    base_scripts.add_assistant()
       
    base_scripts.add_patient('João Dantas', '2002-07-17', '02367016062', '35351587')
    base_scripts.add_patient('Ester Oliveira', '1936-05-04', '85329679060', '35351515')
    
    base_scripts.add_appointment('2024-07-17', '08:00:00','02367016062')
    base_scripts.add_appointment('2024-07-17', '14:00:00', '85329679060')
    
    
except Exception as error:
    print("ERRO*********************************")
    print("ERRO:", error)
    print("FIM*********************************")
    quit(10)