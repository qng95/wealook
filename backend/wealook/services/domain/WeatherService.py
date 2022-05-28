from django.db.models import Q

from wealook.core.models import Weather


__all__ = [
    'WeatherService'
]


class _WeatherService:
    FORECAST_RANGE = 5 # days
    def __init__(self):
        self.model = Weather

    def getForecastForCity(self, location_id):
        pass

    def getForecastForCities(self, locations):
        pass

WeatherService = _WeatherService()