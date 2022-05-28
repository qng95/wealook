from django.db import models

_ALL_WEATHER_COND = "sunny,cloudy,windy,rainy"


class Filter(models.Model):
    """
    We are always using standard measurement.
    Temperature: Kelvin
    Speed: m/s
    Humidity: %
    Cloudiness: %
    Visibility: m
    Volumm: mm
    """
    name = models.CharField(max_length=255, blank=False, default='')
    temp_from = models.FloatField(blank=True, default=-100.00)
    temp_to = models.FloatField(blank=True, default=100.00)
    weather_cond = models.CharField(max_length=len(_ALL_WEATHER_COND), blank=True, default=_ALL_WEATHER_COND)
    regions = models.TextField(blank=True, default='')
    cities = models.TextField(blank=True, default='')
    user_id = models.CharField(max_length=255, blank=False, default='')

    class Meta:
        managed = True
        db_table = 'f_filter'
