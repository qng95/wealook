from django.urls import path

from . import handlers
from .meta import API_PREFIX


urlpatterns = [
    path(f'{API_PREFIX}/userpref/<int:userid>', handlers.user_pref),
    path(f'{API_PREFIX}/filters/<int:userid>', handlers.user_filters),
    path(f'{API_PREFIX}/filters/<int:userid>/<int:filterid>', handlers.filter_details),
    path(f'{API_PREFIX}/cities', handlers.cities),
    path(f'{API_PREFIX}/weather/s/<int:locationid>', handlers.weather_single_location),
    path(f'{API_PREFIX}/weather/m/<int:filterid>', handlers.weather_multiple_location),
]