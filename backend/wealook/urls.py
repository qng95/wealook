from django.urls import re_path

from . import views

urlpatterns = [
    re_path(r'^api/cities$', views.cities_list),
    re_path(r'^api/weather/(?P<location_id>.+)/$', views.weather)
]