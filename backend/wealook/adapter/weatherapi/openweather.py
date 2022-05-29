import requests

from backend.backend_settings.environment_settings import ENV_CONFIG

__all__ = [
    'OpenWeatherApi'
]


class _OpenWeatherApi:
    _API_STR_LATLNG = "https://api.openweathermap.org/data/2.5/forecast?lat=%s&lon=%s&appid=%s"
    _API_STR_CITY = "https://api.openweathermap.org/data/2.5/forecast?q=%s,%s&appid=%s"

    def __init__(self, access_token=''):
        if not access_token and hasattr(ENV_CONFIG, "OPENWEATHER_API_KEY"):
            access_token = ENV_CONFIG.OPENWEATHER_API_KEY
        self.access_token = access_token

    def getCityWeather(self, city_id, city_name, country_iso2):
        api = self._API_STR_CITY % (city_name, country_iso2, self.access_token)
        response = requests.get(api)
        res_json = response.json()
        weather_data = res_json["list"]
        return weather_data

    def getLocationWeather(self, lat, lon):
        api = self._API_STR_LATLNG % (lat, lon)
        response = requests.get(api)
        res_json = response.json()
        weather_data = res_json["list"]
        return weather_data


OpenWeatherApi = _OpenWeatherApi()
