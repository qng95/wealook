from django.db import models


# TODO: still import data from script, this could be imported from django admin page
class Location(models.Model):
    city = models.CharField(max_length=255, blank=False)
    city_ascii = models.CharField(max_length=255, blank=False)
    lat = models.FloatField(blank=False)
    lng = models.FloatField(blank=False)
    country = models.CharField(max_length=255, blank=False)
    iso2 = models.CharField(max_length=5, blank=False)
    iso3 = models.CharField(max_length=5, blank=False)
    capital = models.CharField(max_length=10, blank=True, default='')

    class Meta:
        managed = False
        db_table = 'd_location'
