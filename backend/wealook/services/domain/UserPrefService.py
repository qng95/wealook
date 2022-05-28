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

    def updateUserPreference(self, **data):
        id = data['id']
        obj, created = self.model.objects.update_or_create(id=id, defaults=data)
        return obj


UserPrefService = _UserPrefService()
