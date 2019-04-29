from rest_framework import serializers
from .models import Record, Crop, Decision, ImportCountries
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
            'id', 'label', 'lat', 'lng', 'is_field', 'crop'
        )

class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = (
            'id', 'temp_avg', 'humidity_avg', 'solar_radiation', 'water_loss', 'water_actual', 'time', 'label', 'geolocation'
        )

class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = (
            'id', 'name'
        )

class DecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decision
        fields = (
            'id', 'demand', 'crop_inventory', 'time', 'month', 'decision_flag',
            'tmp_grow', 'tmp_import', 'crop_inventory', 'cost', 'env'
        )

class ImportCoutriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportCountries
        fields = (
            'id', 'full_name', 'abbr', 'quantity_import', 'rank'
        )