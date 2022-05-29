import uuid
from django.db.models import Q

from wealook.core.models import Filter

__all__ = [
    'FilterService'
]


# TODO: logging
class _FilterService:
    def __init__(self):
        self.model = Filter

    def getUserFilters(self, user_id):
        return self.model.objects.filter(
            Q(user_id__exact=user_id)
        )

    def getFilter(self, filter_id):
        return self.model.objects.get(
            Q(id__exact=filter_id)
        )

    # TODO: deprecated
    def getUserFilter(self, user_id, filter_id):
        return self.model.objects.get(
            Q(user_id__exact=user_id),
            Q(id__exact=filter_id)
        )

    def createFilterForUser(self, user_id):
        random_uid = str(uuid.uuid4())
        randome_name = f"Unnamed Filter ({random_uid[:8]})"
        obj, created = self.model.objects.get_or_create(user_id=user_id, name=randome_name)
        if created:
            return obj
        else:
            # TODO: raise error
            return None

    def updateUserFilter(self, user_id, filter_data):
        id = filter_data['id']
        obj, created = self.model.objects.update_or_create(id=id, defaults=filter_data)
        return obj

    def deleteUserFilters(self, user_id):
        return self.model.objects.filter(
            Q(user_id__exact=user_id)
        ).delete()

    def deleteUserFilter(self, user_id, filter_id):
        return self.model.objects.filter(
            Q(id__exact=filter_id),
            Q(user_id__exact=user_id)
        ).delete()


FilterService = _FilterService()
