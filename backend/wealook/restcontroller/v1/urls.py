from django.urls import path

from . import handlers
from .meta import API_PREFIX

# TODO: authenticate and remove userid from unneeded param
urlpatterns = [
    path(f'{API_PREFIX}/userpref/<str:userid>', handlers.user_pref),
    path(f'{API_PREFIX}/filters/<str:userid>', handlers.user_filters),
    path(f'{API_PREFIX}/filters/<str:userid>/<int:filterid>', handlers.filter_details),
    path(f'{API_PREFIX}/cities', handlers.cities),
    path(f'{API_PREFIX}/countries', handlers.countries),
    path(f'{API_PREFIX}/regions', handlers.regions),
    path(f'{API_PREFIX}/weather/s/<int:locationid>', handlers.weather_single_location),
    path(f'{API_PREFIX}/weather/f/<int:filterid>', handlers.weather_by_filter),
    path(f'{API_PREFIX}/weather/m', handlers.weather_by_countries),
]