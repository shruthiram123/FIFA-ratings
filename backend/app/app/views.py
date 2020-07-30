import os
from django.http import HttpResponse, HttpResponseServerError, HttpResponseNotFound, JsonResponse, HttpResponseBadRequest, FileResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .datastore import DataStore
from collections import defaultdict, Counter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

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
                db.set("\n"+request.POST.get('data'), request.POST.get('id'))
                return HttpResponse('Saved')
            except Exception as e:
                return HttpResponseServerError(e)

@csrf_exempt
def edit_player(request):
    if request.method == 'POST':
        if request.POST.get('id') and request.POST.get('data'):
            try:
                db.edit(request.POST.get('id'), request.POST.get('data'))
                return HttpResponse('Saved')
            except Exception as e:
                return HttpResponseServerError(e)

@csrf_exempt
def get_nationality(request):
    if request.method == 'GET':
        try:
            result = defaultdict(int)
            for player in db.db:
                nation = db.db[player].split(',')[5]
                if nation in result:
                    result[nation]+=1
                else:
                    result[nation] = 1
            return JsonResponse(Counter(result).most_common(10), safe=False)
        except Exception as e:
                return HttpResponseServerError(e)

@csrf_exempt
def get_top_ratings(request):
    if request.method == 'GET':
        try:
            temp = {}
            for player in db.db:
                rating = db.db[player].split(',')[7]
                name = db.db[player].split(',')[2]
                temp[name] = rating
            return JsonResponse(Counter(temp).most_common(10), safe=False)
        except Exception as e:
                return HttpResponseServerError(e)


@csrf_exempt
def get_foot_stats(request):
    if request.method == 'GET':
        try:
            temp = defaultdict(int)
            for player in db.db:
                if db.db[player].split(',')[9] == 'Guangzhou R&F':
                    foot = db.db[player].split(',')[15]
                else:
                    foot = db.db[player].split(',')[14]
                temp[foot]+=1
            return JsonResponse(Counter(temp).most_common(2), safe=False)
        except Exception as e:
                return HttpResponseServerError(e)

@csrf_exempt
def get_position_stats(request):
    if request.method == 'GET':
        try:
            temp = defaultdict(int)
            for player in db.db:
                if db.db[player].split(',')[9] == 'Guangzhou R&F':
                    pos = db.db[player].split(',')[22]
                else:
                    pos = db.db[player].split(',')[21]
                temp[pos]+=1
            return JsonResponse(Counter(temp).most_common(10), safe=False)
        except Exception as e:
                return HttpResponseServerError(e)

@csrf_exempt
def get_wage_stats(request):
    if request.method == 'GET':
        try:
            temp = defaultdict(int)
            for player in db.db:
                if db.db[player].split(',')[9] == 'Guangzhou R&F':
                    w = db.db[player].split(',')[13]
                
                else:
                    w = db.db[player].split(',')[12]
                
                if w[-1] == "K":
                    wage = int(w[1:-1])*1000
                else:
                    wage = int(w[1:])
                name = db.db[player].split(',')[2]
                temp[name] = wage
            return JsonResponse(Counter(temp).most_common(10), safe=False)
        except Exception as e:
            print(e)
            return HttpResponseServerError(e)