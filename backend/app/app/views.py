from django.http import HttpResponse
from django.shortcuts import render

def server_status(request):
    return HttpResponse('Server is up!')