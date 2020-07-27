import os
from django.http import HttpResponse, HttpResponseServerError, HttpResponseNotFound, JsonResponse, HttpResponseBadRequest, FileResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .datastore import DataStore

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print(BASE_DIR)

def server_status(request):
    return HttpResponse('Server is up!')

def setup_database():
    mydb = DataStore(BASE_DIR+"/app/mydb.csv", BASE_DIR+"/app/headings.csv")
    return(mydb)

db = setup_database()

@csrf_exempt
def search_player(request):
    if request.method == 'POST':
        if request.POST.get('id'):
            if db.get(str(request.POST.get('id'))):
                return JsonResponse(db.get(str(request.POST.get('id'))), safe=False)
            else:
                return HttpResponse('Not Found', status = 404)
        else:
            return HttpResponseNotFound()

@csrf_exempt
def get_range(request):
    if request.method == 'POST':
        if request.POST.get('start') and request.POST.get('end'):
            return JsonResponse(db.get_range(int(request.POST.get('start')), int(request.POST.get('end'))), safe=False)
        else:
            return HttpResponseNotFound()


@csrf_exempt
def delete_player(request):
    if request.method == 'POST':
        if request.POST.get('id'):
            return JsonResponse(db.delete(str(request.POST.get('id'))), safe=False)
        else:
            return HttpResponseNotFound()

@csrf_exempt
def get_headings(request):
    if request.method == 'GET':
        return JsonResponse({'headings' : db.headings, 'total': len(db.db)}, safe=False)

@csrf_exempt
def add_player(request):
    if request.method == 'POST':
        if request.POST.get('id') and request.POST.get('data'):
            try:
                db.set(data, id)
                return HttpResponse('Saved')
            except Exception as e:
                return HttpResponseServerError(e)

@csrf_exempt
def edit_player(request):
    if request.method == 'POST':
        if request.POST.get('id') and request.POST.get('data'):
            try:
                db.edit(id, data)
                return HttpResponse('Saved')
            except Exception as e:
                return HttpResponseServerError(e)