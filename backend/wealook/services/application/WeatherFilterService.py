from ..domain import WeatherService, FilterService
from ..domain import LocationService

__all__ = [
    'WeatherFilterService'
]


class _WeatherFilterService:
    def __init__(self):
        self.locationService = LocationService  # Singleton Pattern
        self.weatherService = WeatherService
        self.filterService = FilterService

    def getCitiesWeatherByFilter(self, filter_id, mode):
        filter_details = self.filterService.getFilter(filter_id=filter_id)

        filter_regions = filter_details.regions.split(",")
        filter_regions = [region.strip() for region in filter_regions]

        filter_countries_iso3 = filter_details.countries_iso3.split(",")
        filter_countries_iso3 = [country_iso3.strip() for country_iso3 in filter_countries_iso3]

        countries = self.locationService.getMultiRegionCountries(regions=filter_regions)
        countries_iso3 = [country.iso3 for country in countries]
        countries_iso3 += filter_countries_iso3

        cities = self.locationService.getCitiesByIso3List(iso3_list=countries_iso3)
        location_ids = [city.id for city in cities]

        if mode == 'forecast':
            return self.weatherService.getForecastForCities(location_ids=location_ids)
        elif mode == 'today':
            return self.weatherService.getTodayForecastForCities(location_ids=location_ids)
        elif mode == 'forecast_mid':
            return self.weatherService.getMiddayForecastForCities(location_ids=location_ids)
        elif mode == 'today_mid':
            return self.weatherService.getTodayMiddayForCities(location_ids=location_ids)

        return None


WeatherFilterService = _WeatherFilterService()
