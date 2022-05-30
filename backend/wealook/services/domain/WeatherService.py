from datetime import datetime, timedelta

from django.db.models import Q

from wealook.core.models import Weather

__all__ = [
    'WeatherService'
]


class _WeatherService:
    FORECAST_RANGE = 5  # days

    def __init__(self):
        self.model = Weather

    def _getToday(self):
        return datetime.today()

    def _getDateRange(self):
        from_date = self._getToday()
        date_range = [(from_date + timedelta(days=day)) for day in range(0, self.FORECAST_RANGE + 1)]
        return date_range

    def _getMidday(self, date):
        midday = date.replace(hour=12, minute=0, second=0, microsecond=0)
        return midday

    def _getTodayMidday(self):
        return self._getMidday(self._getToday())

    def _getForecastMidday(self):
        today = self._getToday()
        forecast_midday = [today]
        for day in range(1, self.FORECAST_RANGE + 1):
            forecast_midday.append(today + timedelta(days=day))
        forecast_midday = [self._getMidday(date) for date in forecast_midday]
        return forecast_midday

    def getTodayMiddayForCity(self, location_id):
        midday = self._getTodayMidday()
        midday_epoch = int(midday.timestamp())
        return self.model.objects.filter(
            Q(dt__exact=midday_epoch),
            Q(location_id__exact=location_id)
        )

    def getTodayForecastForCity(self, location_id):
        today = self._getToday()
        return self.model.objects.filter(
            Q(rdate__exact=today),
            Q(location_id__exact=location_id)
        )

    def getForecastForCity(self, location_id): # 5 days - 3 hour forecast for single city
        date_rage = self._getDateRange()
        return self.model.objects.filter(
            Q(rdate__in=date_rage),
            Q(location_id__exact=location_id)
        )

    def getMiddayForecastForCity(self, location_id): # 5 days -  midday forecast for single city
        forecast_midday = self._getForecastMidday()
        forecase_midday_epoch = [midday.timestamp() for midday in forecast_midday]
        return self.model.objects.filter(
            Q(dt__in=forecase_midday_epoch),
            Q(location_id__exact=location_id)
        )

    def getTodayMiddayForCities(self, location_ids): # today - midday forecast for all specified cities
        midday = self._getTodayMidday()
        midday_epoch = int(midday.timestamp())
        return self.model.objects.filter(
            Q(dt__exact=midday_epoch),
            Q(location_id__in=location_ids)
        )

    def getTodayForecastForCities(self, location_ids): # today - 3 hour forecast for all specified cities
        today = self._getToday()
        return self.model.objects.filter(
            Q(rdate__exact=today),
            Q(location_id__in=location_ids)
        )

    def getMiddayForecastForCities(self, location_ids): # 5 day - midday forecasts for all specified cities
        forecast_midday = self._getForecastMidday()
        forecase_midday_epoch = [midday.timestamp() for midday in forecast_midday]
        return self.model.objects.filter(
            Q(dt__in=forecase_midday_epoch),
            Q(location_id__in=location_ids)
        )

    def getForecastForCities(self, location_ids): # 5 day - 3 hour forecasts for all specified cities
        date_range = self._getDateRange()
        return self.model.objects.filter(
            Q(rdate__in=date_range),
            Q(location_id__in=location_ids)
        )


WeatherService = _WeatherService()
