from rest_framework import serializers
from .models import Location, Weather, Filter


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id',
                  'city_ascii',
                  'country',
                  'capital')


class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ('location_id',
                  'rdate',
                  'temp')


class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = ('name',
                  'temp_from',
                  'temp_to',
                  'weather_cond')
