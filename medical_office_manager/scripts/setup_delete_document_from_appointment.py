import base_scripts
from sys import platform

try:    
    base_scripts.clear_all_data()
    base_scripts.add_doctor()
    base_scripts.add_patient('João Dantas', '2002-07-17', '02367016062', '35351587')
    base_scripts.add_appointment('2024-05-17', '08:00:00','02367016062')

    if platform == "win32":
    # CAMINHO PARA RODAR TESTE LOCALMENTE
        docpath = r"C:\Users\emanu\Desktop\PYTHON\Django\MedicalOffice\medical_office_manager\media\documentos\hemograma.png"
    else:
        # CAMINHO PARA RODAR TESTE NO GITHUB
        docpath = "/home/runner/work/MedicalOffice/MedicalOffice/medical_office_manager/media/hemograma.png"
    
    base_scripts.add_document_to_appointment('2024-05-17', '08:00:00','Hemograma', docpath)
    
except Exception as error:
    print("ERRO*********************************")
    print("ERRO:", error)
    print("FIM*********************************")
    quit(10)