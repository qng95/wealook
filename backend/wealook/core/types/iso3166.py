import os
from csv import DictReader
from .Country import Country

__all__ = [
    'get_all_countries',
    'get_all_regions',
    'get_region_countries',
    'get_multiregion_countries',
    'get_countries_iso3'
]


class _Iso3166WithRegions:
    _BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    _ISO_3166_WITH_REGION_CSV = os.path.join(_BASE_DIR, "iso_3166_with_region.csv")

    def __init__(self):
        self.countries = []
        self.countries_iso3 = {}
        self.regions = set()
        self.region_with_countries = {}

        with open(self._ISO_3166_WITH_REGION_CSV, 'r') as iso3166_file:
            reader = DictReader(iso3166_file)
            for row in reader:
                country_name = row['name']
                iso3 = row['alpha-3']
                region = row['region']
                sub_region = row['sub-region']
                intermediate_region = row['intermediate-region']
                country = Country(
                    name=country_name,
                    iso3=iso3,
                    regions=[_r for _r in [region, sub_region, intermediate_region] if _r]
                )
                self.countries.append(country)
                for _r in [region, sub_region, intermediate_region]:
                    if _r:
                        self.regions.add(_r)
                        if _r not in self.region_with_countries:
                            self.region_with_countries[_r] = []
                        self.region_with_countries[_r].append(country)

    def getAllCountries(self):
        return self.countries

    def getAllRegions(self):
        return self.regions

    def getCountriesOfRegion(self, region):
        if region in self.region_with_countries:
            return self.region_with_countries[region]
        else:
            return []


_IMPL = _Iso3166WithRegions()


def get_all_countries():
    return _IMPL.getAllCountries()


def get_all_regions():
    return _IMPL.getAllRegions()


def get_region_countries(region):
    return _IMPL.getCountriesOfRegion(region)


def get_multiregion_countries(regions):
    res = []
    for region in regions:
        res += get_region_countries(region)
    return res


def get_countries_iso3(countries):
    return [country['iso3'] for country in countries]
