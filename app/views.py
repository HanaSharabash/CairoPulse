import json
from django.shortcuts import render,HttpResponse
from database.databse import search_neighborhoods
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

def search_nighborhoods (request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    data = search_neighborhoods(body)
    return JsonResponse(data, safe=False)