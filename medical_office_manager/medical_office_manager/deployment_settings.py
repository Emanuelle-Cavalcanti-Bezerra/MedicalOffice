import os
from .settings import *
from .settings import BASE_DIR


# TODO: Azure-> App Service criado-> Configurações -> Nova application settings (próximo de AZURE_POSTGRESQL_CONNECTIONSTRING)
#    SECRET_KEY = os.environ['SECRET'] 
ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']]
CSRF_TRUSTED_ORIGINS = ['https://' + os.environ['WEBSITE_HOSTNAME']]
DEBUG = False

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # Add whitenoise middleware after the security middleware                             
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    #Adicionar whitenoise na lista de aplicativos instalados
    "whitenoise.runserver_nostatic",
]

# STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = ('whitenoise.storage.CompressedManifestStaticFilesStorage')

connection_string = os.environ['AZURE_POSTGRESQL_CONNECTIONSTRING']
connection_parameters = {pair.split('='): pair.split('=')[1] for pair in connection_string.spli(' ')}

DATABASES = {
    
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': connection_parameters['dbname'],
        'HOST': connection_parameters['host'],
        'USER': connection_parameters['user'],
        'PASSWORD': connection_parameters['password'],   
    }
}
