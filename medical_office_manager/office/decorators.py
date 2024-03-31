from django.http import HttpRequest
from django.shortcuts import render
from django.http import HttpResponseForbidden

def assistant_required(function):
    def wrapper(request, *args, **kwargs):
        if request.user.groups.filter(name="assistentes").exists():
            return function(request, *args, **kwargs)
        raise HttpResponseForbidden #TODO CUSTOM 403 ERROR PAGE

    return wrapper

def doctor_required(function):
    def wrapper(request, *args, **kwargs):
        if request.user.groups.filter(name="médicos").exists():
            return function(request, *args, **kwargs)
        raise HttpResponseForbidden #TODO CUSTOM 403 ERROR PAGE

    return wrapper
