from rest_framework import serializers
from .models import Records


class RecordSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')
    # date = serializers.CharField(source='sysTime')
    api_secret = serializers.ReadOnlyField(source='owner.password')
    class Meta:
        model = Records
        fields = (
            'id', 'api_secret', 'sgv', 'direction', 'sysTime',
            'dateString', 'rawData', 'owner'
        )


