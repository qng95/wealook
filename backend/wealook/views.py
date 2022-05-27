from django.http.response import JsonResponse
from rest_framework import status

from .models import Location, Weather
from .serializers import LocationSerializer, WeatherSerializer
from rest_framework.decorators import api_view


@api_view(['GET'])
def cities_list(request):
    tutorials = Location.objects.all()
    tutorials_serializer = LocationSerializer(tutorials, many=True)

    return_mess = {'result': status.HTTP_200_OK,
                   'message': 'successful',
                   'data:': {
                       'cities': tutorials_serializer.data
                    }
                   }
    return JsonResponse(return_mess, safe=False)


@api_view(['GET'])
def weather(request, location_id):
    # find tutorial by pk (id)
    try:
        tutorial = Weather.filter_by_location(location_id)
        print(location_id)
        tutorial_serializer = WeatherSerializer(tutorial, many=True)
        return JsonResponse(tutorial_serializer.data, safe=False)

    except Location.DoesNotExist:
        return JsonResponse({'message': 'The location does not exist'}, status=status.HTTP_404_NOT_FOUND)
