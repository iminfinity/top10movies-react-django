from django.urls import path

from . import views

app_name = 'top10'
urlpatterns = [
    path('', views.index, name="index"),
    path('movies/', views.movies, name="movies"),
]