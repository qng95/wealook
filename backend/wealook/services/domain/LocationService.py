from django.db.models import Q

from wealook.adapter.locationapi import LocationApi
from wealook.core.models import Location
from wealook.core.types import iso3166, Country

__all__ = [
    'LocationService'
]


class _LocationService:
    def __init__(self):
        self.model = Location

    def getAllCities(self):
        return self.model.objects.all()

    def getCitiesStartsWith(self, query):
        return self.model.objects.filter(
            Q(city_ascii__startswith=query)
        )

    def getCityById(self, id):
        return self.model.objects.get(
            Q(id__exact=id)
        )

    def getCitiesByCountryIso3(self, country_iso3):
        return self.model.objects.filter(
            Q(iso3__iexact=country_iso3)  # case-insensitive
        )

    def getCitiesByCountryIso2(self, country_iso2):
        return self.model.objects.filter(
            Q(iso2__iexact=country_iso2)  # case-insensitive
        )

    def getCitiesByCountryName(self, country):
        return self.model.objects.filter(
            Q(country__iexact=country)  # case-insensitive
        )

    def getCitiesByIso3List(self, iso3_list):
        return self.model.objects.filter(
            Q(iso3__in=iso3_list)
        )

    def getCitiesByRegion(self, region):
        countries = self.getRegionCountries(region)
        countries_iso3 = [country.iso3 for country in countries]
        return self.getCitiesByIso3List(countries_iso3)

    def getCitiesByRegions(self, regions):
        countries = self.getMultiRegionCountries(regions)
        countries_iso3 = [country.iso3 for country in countries]
        return self.getCitiesByIso3List(countries_iso3)

    def getCapitalByCountryName(self, country):
        return self.model.objects.filter(
            Q(country__iexact=country),
            Q(capital__iexact="primary")
        )

    def getCapitalByCountryIso2(self, country_iso2):
        return self.model.objects.filter(
            Q(country__iso2=country_iso2),
            Q(capital__iexact="primary")
        )

    def getCapitalByCountryIso3(self, country_iso3):
        return self.model.objects.filter(
            Q(country__iso3=country_iso3),
            Q(capital__iexact="primary")
        )

    def getUserCityByIp(self, user_ip):
        user_city = LocationApi.get_ip_city(user_ip)
        result = self.model.objects.get(
            Q(city_ascii__iexact=user_city)
        )
        if result:
            return result

        lat, lng = LocationApi.get_ip_loc(user_ip)
        user_country_iso2 = LocationApi.get_ip_country(user_ip)
        results = self.model.objects.filter(
            Q(lat__range=(lat - 0.015, lat + 0.015)),
            Q(lng__range=(lng - 0.015, lng + 0.015)),
            Q(iso2__iexact=user_country_iso2)
        )
        if results:
            for r in results:
                rcity = r.city_ascii
                if rcity in user_city or user_city in rcity:
                    return r

        results = self.model.objects.filter(
            Q(iso2__iexact=user_country_iso2)
        )
        if results:
            for r in results:
                rcity = r.city_ascii
                if rcity in user_city or user_city in rcity:
                    return r

            # not found -> take country capital
            for r in results:
                capital = r.capital == "primary"
                if capital:
                    return r

    def getRegionCountries(self, region):
        return iso3166.get_region_countries(region)

    def getMultiRegionCountries(self, regions):
        return iso3166.get_multiregion_countries(regions)

    def getAllRegions(self):
        return iso3166.get_all_regions()

    def getAllCountries(self):
        return iso3166.get_all_countries()

LocationService = _LocationService()
