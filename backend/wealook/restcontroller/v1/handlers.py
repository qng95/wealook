from django.http.response import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view

from wealook.core.serializers import WeatherSerializer, LocationSerializer, UserPrefSerializer, FilterSerializer
from wealook.services.application import WeatherFilterService
from wealook.services.domain import LocationService, FilterService, UserPrefService, WeatherService


def _get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


@api_view(['GET', 'PUT'])
def user_pref(request, userid):
    """
    Receive request from <api_prefix>/userpref/:userid
    """
    if request.method == "GET":
        userpref = UserPrefService.getUserPreference(user_id=userid)
        homeLocationId = userpref.home_location_id
        if not homeLocationId:
            user_ip = _get_client_ip(request)
            usercity = LocationService.getUserCityByIp(user_ip)
            homeLocationId = usercity.id
            UserPrefService.updateUserPreference(data = {
                'user_id': userid,
                'home_location_id': homeLocationId
            })
        else:
            usercity = LocationService.getCityById(homeLocationId)

        usercity_serializer = LocationSerializer(usercity, many=False)
        res = {
            'result': status.HTTP_200_OK,
            'message': 'successful',
            'data': usercity_serializer.data
        }
        return JsonResponse(res, safe=False, status=status.HTTP_200_OK)

    if request.method == "PUT":
        data = request.data
        userpref_serializer = UserPrefSerializer(data=data)
        if userpref_serializer.is_valid():
            UserPrefService.updateUserPreference(data=data)
            res = {
                'result': status.HTTP_200_OK,
                'message': 'successful',
            }
            return JsonResponse(res, safe=False, status=status.HTTP_200_OK)

        res = {
            'result': status.HTTP_400_BAD_REQUEST,
            'message': 'invalid data',
            'errors': userpref_serializer.errors
        }
        return JsonResponse(res, safe=False, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE'])
def user_filters(request, userid):
    """
    Receive request from <api_prefix>/filters/:userid
    """
    if request.method == "GET":
        filters = FilterService.getUserFilters(user_id=userid)
        filter_serializer = FilterSerializer(filters, many=True)
        res = {
            'result': status.HTTP_200_OK,
            'message': 'successful',
            'data': {
                'filters': filter_serializer.data
            }
        }
        return JsonResponse(res, safe=False, status=status.HTTP_200_OK)

    if request.method == "POST":
        new_filter = FilterService.createFilterForUser(user_id=userid)
        filter_serializer = FilterSerializer(new_filter, many=False)
        res = {
            'result': status.HTTP_200_OK,
            'message': 'successful',
            'data': filter_serializer.data
        }
        return JsonResponse(res, safe=False, status=status.HTTP_200_OK)

    if request.method == "DELETE":
        FilterService.deleteUserFilters(user_id=userid)
        res = {
            'result': status.HTTP_200_OK,
            'message': 'successful',
        }
        return JsonResponse(res, safe=False, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT', 'DELETE'])
def filter_details(request, userid, filterid):
    if request.method == "GET":
        filter = FilterService.getUserFilter(user_id=userid, filter_id=filterid)
        filter_serializer = FilterSerializer(filter, many=False)
        res = {
            'result': status.HTTP_200_OK,
            'message': 'successful',
            'data': filter_serializer.data
        }
        return JsonResponse(res, safe=False, status=status.HTTP_200_OK)

    if request.method == "PUT":
        data = request.data
        if not hasattr(data, "user_id"):
            data["user_id"] = userid

        filter_serializer = FilterSerializer(data=data)
        if filter_serializer.is_valid():
            updated_filter_data = FilterService.updateUserFilter(user_id=userid, filter_data=data)
            response_serializer = FilterSerializer(updated_filter_data, many=False)
            res = {
                'result': status.HTTP_200_OK,
                'message': 'successful',
                'data': response_serializer.data
            }
            return JsonResponse(res, safe=False, status=status.HTTP_200_OK)

        res = {
            'result': status.HTTP_400_BAD_REQUEST,
            'message': 'invalid data',
            'errors': filter_serializer.errors
        }
        return JsonResponse(res, safe=False, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        FilterService.deleteUserFilter(user_id=userid, filter_id=filterid)
        res = {
            'result': status.HTTP_200_OK,
            'message': 'successful',
        }
        return JsonResponse(res, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
def cities(request):
    query_params = request.query_params
    city_query = query_params.get('q')
    if not city_query:
        cities = LocationService.getAllCities()
    else:
        cities = LocationService.getCitiesStartsWith(city_query)

    citiesNameWithId = [{'name': city.city_ascii, 'id': city.id} for city in cities]
    res = {
        'result': status.HTTP_200_OK,
        'message': 'successful',
        'data': {
            'cities': citiesNameWithId
        }}
    return JsonResponse(res, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
def mycities(request):
    user_ip = _get_client_ip(request)
    mycity = LocationService.getUserCityByIp(user_ip)
    city_serializer = LocationSerializer(mycity, many=False)
    res = {
        'result': status.HTTP_200_OK,
        'message': 'successful',
        'data': city_serializer.data
    }
    return JsonResponse(res, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
def regions(request):
    regions = [item for item in LocationService.getAllRegions()]
    res = {
        'result': status.HTTP_200_OK,
        'message': 'successful',
        'data': {
            'regions': regions
        }}
    return JsonResponse(res, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
def countries(request):
    countries = LocationService.getAllCountries()
    sortened = [{
        'name': country.name,
        'iso3': country.iso3
    } for country in countries]
    res = {
        'result': status.HTTP_200_OK,
        'message': 'successful',
        'data': {
            'countries': sortened
        }}
    return JsonResponse(res, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
def weather_single_location(request, locationid):
    query_params = request.query_params
    mode = query_params.get('mode')
    if not mode:
        mode = 'N/A'

    if mode == 'forecast':
        weather = WeatherService.getForecastForCity(location_id=locationid)
    elif mode == 'today':
        weather = WeatherService.getTodayForecastForCity(location_id=locationid)
    elif mode == 'forecast_mid':
        weather = WeatherService.getMiddayForecastForCity(location_id=locationid)
    elif mode == 'today_mid':
        weather = WeatherService.getTodayMiddayForCity(location_id=locationid)
    else:
        res = {
            'result': status.HTTP_400_BAD_REQUEST,
            'message': 'invalid query params',
        }
        return JsonResponse(res, safe=False, status=status.HTTP_400_BAD_REQUEST)

    weather_serializer = WeatherSerializer(weather, many=True)
    res = {
        'result': status.HTTP_200_OK,
        'message': 'successful',
        'data': {
            'weather': weather_serializer.data
        }}
    return JsonResponse(res, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
def weather_by_filter(request, filterid):
    query_params = request.query_params
    mode = query_params.get('mode')
    if not mode:
        mode = 'N/A'

    filtered_weather = WeatherFilterService.getCitiesWeatherByFilter(filter_id=filterid, mode=mode)
    weather_serializer = WeatherSerializer(filtered_weather, many=True)
    res = {
        'result': status.HTTP_200_OK,
        'message': 'successful',
        'data': {
            'weather': weather_serializer.data
        }}
    return JsonResponse(res, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
def weather_by_countries(request):
    query_params = request.query_params
    countries = query_params.get('countries')
    if not countries:
        countries = ''
    countries = [country.strip() for country in countries.split(",")]
    cities = []
    for country in countries:
        cities += LocationService.getCitiesByCountryName(country)
    cities = [city.id for city in cities]
    filtered_weather = WeatherService.getTodayMiddayForCities(cities)
    weather_serializer = WeatherSerializer(filtered_weather, many=True)
    res = {
        'result': status.HTTP_200_OK,
        'message': 'successful',
        'data': {
            'weather': weather_serializer.data
        }}
    return JsonResponse(res, safe=False, status=status.HTTP_200_OK)
