from rest_framework import serializers

from wealook.core.models import Filter


class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = ('id',
                  'name',
                  'temp_from',
                  'temp_to',
                  'weather_cond',
                  'regions',
                  'cities')
