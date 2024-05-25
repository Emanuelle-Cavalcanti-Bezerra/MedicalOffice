from django.core.exceptions import PermissionDenied

def assistant_required(function):
    def wrapper(request, *args, **kwargs):
        if request.user.groups.filter(name="assistentes").exists():
            return function(request, *args, **kwargs)
        raise PermissionDenied 

    return wrapper

def doctor_required(function):
    def wrapper(request, *args, **kwargs):
        if request.user.groups.filter(name="médicos").exists():
            return function(request, *args, **kwargs)
        raise PermissionDenied 

    return wrapper

def manager_required(function):
    def wrapper(request, *args, **kwargs):
        if request.user.is_superuser:
            return function(request, *args, **kwargs)
        raise PermissionDenied 

    return wrapper
