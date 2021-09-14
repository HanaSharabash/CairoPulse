from django.shortcuts import render
from django.http import Http404

def home_page (request) :
        return render(request , 'home.html')


def contact_us (request) :
        return render(request , 'contact-us.html')

def about (request) :
         return render(request , 'about.html')

def map (request):
        return render(request , 'map.html')

