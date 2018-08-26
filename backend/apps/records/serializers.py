from rest_framework import serializers
from .models import Records


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Records
        fields = (
            'id', 'api_secret', 'sgv', 'direction', 'date',
            'dateString', 'rawData'
        )