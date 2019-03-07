from rest_framework import serializers
from .models import Record
from .models import Prediction
from .models import Geolocation


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = (
            'id', 'temp_avg', 'humidity_avg','precipitation', 'wind_avg', 'gust_max','solar_radiation', 'water_loss', 'time', 'label', 'geolocation'
        )

class GeolocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Geolocation
        fields = (
            'id', 'label', 'lat', 'lng', 'is_field'
        )

class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = (
            'id', 'temp_avg', 'humidity_avg', 'solar_radiation', 'water_loss', 'water_actual', 'time', 'label', 'geolocation'
        )