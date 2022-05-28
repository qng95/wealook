from rest_framework import serializers

from wealook.core.models import Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id',
                  'city',
                  'city_ascii',
                  'lat',
                  'lng',
                  'country',
                  'iso2',
                  'iso3',
                  'capital')
