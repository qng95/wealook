from django.http.response import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view

from wealook.core.models import Weather, Location
from wealook.core.serializer import WeatherSerializer, LocationSerializer
from wealook.services.domain import LocationService


@api_view(['GET', 'PUT'])
def user_pref(request, userid):
    """
    Receive request from <api_prefix>/userpref/:userid
    """
    if request.method == "GET":
        pass
    if request.method == "PUT":
        pass


@api_view(['GET', 'POST'])
def user_filters(request, userid):
    """
    Receive request from <api_prefix>/filters/:userid
    """
    if request.method == "GET":
        pass
    if request.method == "POST":
        pass


@api_view(['GET', 'PUT', 'DELETE'])
def filter_details(request, userid, filterid):
    if request.method == "GET":
        pass
    if request.method == "PUT":
        pass
    if request.method == "DELETE":
        pass


@api_view(['GET'])
def cities(request):
    locations = LocationService.getAllCities()
    tutorials_serializer = LocationSerializer(locations, many=True)

    return_mess = {'result': status.HTTP_200_OK,
                   'message': 'successful',
                   'data:': {
                       'cities': tutorials_serializer.data
                   }
                   }
    return JsonResponse(return_mess, safe=False)


@api_view(['GET'])
def weather_single_location(request, locationid):
    # find tutorial by pk (id)
    try:
        tutorial = Weather.objects.filter(location_id=locationid)
        print(locationid)
        tutorial_serializer = WeatherSerializer(tutorial, many=True)
        return JsonResponse(tutorial_serializer.data, safe=False)

    except Location.DoesNotExist:
        return JsonResponse({'message': 'The location does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def weather_multiple_location(request, filterid):
    pass