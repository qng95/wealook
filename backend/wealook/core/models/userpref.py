from django.db import models


class UserPreference(models.Model):
    user_id = models.CharField(max_length=255, blank=False, default='')
    home_location_id = models.CharField(max_length=255, blank=False, default='')

    class Meta:
        managed = True
        db_table = 'f_userpref'
