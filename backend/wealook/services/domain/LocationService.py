from django.db.models import Q
from functools import cache

from wealook.core.models import Location

__all__ = [
    'LocationService'
]


class _LocationService:
    def __init__(self):
        self.model = Location

    def getAllCities(self):
        return self.model.objects.all()

    def getCitiesByCountryIso3(self, country_iso3):
        return self.model.objects.get(
            Q(iso3__iexact=country_iso3)  # case-insensitive
        )

    def getCitiesByCountryIso2(self, country_iso2):
        return self.model.objects.get(
            Q(iso2__iexact=country_iso2)  # case-insensitive
        )

    def getCitiesByCountryName(self, country):
        return self.model.objects.get(
            Q(country__iexact=country)  # case-insensitive
        )


LocationService = _LocationService()
