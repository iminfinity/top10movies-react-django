from django.shortcuts import render

import time
from django.http import JsonResponse

from .data import maindata

import json

# Create your views here.

def index(request) :
    return render(request, 'top10/index.html')

def movies(request):

	# Get start and end points
	year = int(request.GET.get("year") or 2000)
	rank = int(request.GET.get("rank") or 10)

	# Generate list of posts
	data = maindata[str(year)][str(rank)]

	# Return posts
	return JsonResponse({
		'movie': data
		})