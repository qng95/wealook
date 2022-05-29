from rest_framework import serializers

from wealook.core.models import Weather


class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ('rdate',
                  'dt',
                  'location_id',
                  'temp',
                  'temp_min',
                  'temp_max',
                  'feels_like',
                  'humidity',
                  'weather_cond_id',
                  'cloudiness',
                  'wind_speed',
                  'wind_gust',
                  'visibility')
