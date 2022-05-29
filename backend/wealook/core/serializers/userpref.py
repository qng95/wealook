from rest_framework import serializers

from wealook.core.models import UserPreference


class UserPrefSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreference
        fields = ('id',
                  'user_id',
                  'home_location_id')