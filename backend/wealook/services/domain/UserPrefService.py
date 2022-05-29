from django.db.models import Q

from wealook.core.models import UserPreference

__all__ = [
    'UserPrefService'
]


class _UserPrefService:
    def __init__(self):
        self.model = UserPreference

    def getUserPreference(self, user_id):
        obj, created = self.model.objects.get_or_create(user_id=user_id)
        return obj

    def updateUserPreference(self, data):
        user_id = data['user_id']
        user_pref = self.getUserPreference(user_id)
        setattr(user_pref, 'home_location_id', data['home_location_id'])
        user_pref.save()


UserPrefService = _UserPrefService()
