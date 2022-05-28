from django.db import models


class Weather(models.Model):
    """
    We are always using standard measurement.
    Temperature: Kelvin
    Speed: m/s
    Humidity: %
    Cloudiness: %
    Visibility: m
    Volumm: mm
    """
    rdate = models.DateField(blank=False)
    dt = models.BigIntegerField(blank=False)
    location_id = models.BigIntegerField(blank=False)
    temp = models.FloatField(blank=False)
    temp_min = models.FloatField(blank=False)
    temp_max = models.FloatField(blank=False)
    feels_like = models.FloatField(blank=False)
    humidity = models.BigIntegerField(blank=False)
    weather_cond_id = models.BigIntegerField(blank=False)
    cloudiness = models.BigIntegerField(blank=False)
    wind_speed = models.FloatField(blank=False)
    wind_gust = models.FloatField(blank=False)
    visibility = models.BigIntegerField(blank=False)

    class Meta:
        managed = False
        db_table = 'f_weather'
