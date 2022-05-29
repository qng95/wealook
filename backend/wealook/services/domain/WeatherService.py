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

    def _getDateRange(self):
        from_date = datetime.today()
        to_date = from_date + timedelta(days=self.FORECAST_RANGE)
        return from_date, to_date

    def _getMidday(self, date):
        midday = date.replace(hour=12, minute=0, second=0, microsecond=0)
        return midday

    def _getTodayMidday(self):
        return self._getMidday(datetime.today())

    def _getForecastMidday(self):
        today = datetime.today()
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
        from_date, _ = self._getDateRange()
        return self.model.objects.filter(
            Q(rdate__exact=from_date),
            Q(location_id__exact=location_id)
        )

    def getForecastForCity(self, location_id): # 5 days - 3 hour forecast for single city
        from_date, to_date = self._getDateRange()
        return self.model.objects.filter(
            Q(rdate__in=(from_date, to_date)),
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
        from_date, _ = self._getDateRange()
        return self.model.objects.filter(
            Q(rdate__exact=from_date),
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
        from_date, to_date = self._getDateRange()
        return self.model.objects.filter(
            Q(rdate__in=(from_date, to_date)),
            Q(location_id__in=location_ids)
        )


WeatherService = _WeatherService()
