from ..domain import WeatherService
from ..domain import LocationService

__all__ = [
    'WeatherFilterService'
]


class _WeatherFilterService:
    def __init__(self):
        self.locationService = LocationService # Singleton Pattern
        self.weatherService = WeatherService


WeatherFilterService = _WeatherFilterService()
