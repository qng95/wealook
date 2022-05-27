from django.db import models


class Location(models.Model):
    city_ascii = models.CharField(max_length=70, blank=False, default='')
    country = models.CharField(max_length=70, blank=False, default='')
    capital = models.CharField(max_length=10, blank=True, default='')

    class Meta:
        managed = False
        db_table = 'd_location'


class Weather(models.Model):
    rdate = models.CharField(max_length=70, blank=False, default='')
    location_id = models.BigIntegerField(null=False)
    temp = models.CharField(max_length=10, blank=True, default='')

    class Meta:
        managed = False
        db_table = 'f_weather'

    @staticmethod
    def filter_by_location(location_id):
        return Weather.objects.filter(location_id=location_id)


class Filter(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')
    temp_from = models.CharField(max_length=10, blank=True, default='')
    temp_to = models.CharField(max_length=10, blank=True, default='')
    weather_cond = models.CharField(max_length=10, blank=True, default='')

    class Meta:
        managed = False
        db_table = 'f_filter'
