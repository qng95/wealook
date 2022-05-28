from django.db.models import Q

from wealook.core.models import Filter

__all__ = [
    'FilterService'
]


class _FilterService:
    def __init__(self):
        self.model = Filter

    def getUserFilters(self, user_id):
        return self.model.objects.get(
            Q(user_id__exact=user_id)
        )

    def getFilter(self, filter_id):
        return self.model.objects.get(
            Q(id__exact=filter_id)
        )

    def createFilterForUser(self, **filter_data):
        user_id = filter_data['user_id']
        name = "Unnamed Filter"
        obj, created = self.model.objects.get_or_create(user_id=user_id, name=name)
        if created:
            return obj
        else:
            #TODO: raise error
            return None

    def updateFilter(self, **filter_data):
        id = filter_data['id']
        obj, created = self.model.objects.update_or_create(id=id, defaults=filter_data)
        return obj

    def deleteFilter(self, filter_id):
        return self.model.objects.filter(id=filter_id).delete()


FilterService = _FilterService()
