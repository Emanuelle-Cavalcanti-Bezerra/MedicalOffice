from sys import platform



try:    
    print(type(platform))
    
except Exception as error:
    print("ERRO*********************************")
    print("ERRO:", error)
    print("FIM*********************************")
    quit(10)