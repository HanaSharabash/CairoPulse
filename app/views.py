import json
from django.shortcuts import render,HttpResponse
from database import databse
from django.http import JsonResponse
from django.http import Http404
from django.views.decorators.csrf import csrf_protect, csrf_exempt


def home_page (request) :
        return render(request , 'home.html')


def contact_us (request) :
        return render(request , 'contact-us.html')

def about (request) :
         return render(request , 'about.html')

def map (request):
        return render(request , 'map.html')

@csrf_exempt
def search_nighborhoods (request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    data = databse.search_neighborhoods(body)
    return JsonResponse(data, safe=False)

@csrf_exempt
def get_geometries(request):
    data = databse.get_neighbourhoods()
    return JsonResponse(data,safe=False)

@csrf_exempt
def  get_categories(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    data = databse.get_categories(body)
    print(data)
    return JsonResponse(data,safe=False)