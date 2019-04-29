from django.db import models


class Record(models.Model):
    id = models.AutoField(primary_key=True)
    temp_avg = models.FloatField(null=True, blank=True)
    humidity_avg = models.FloatField(null=True, blank=True)
    precipitation = models.FloatField(null=True, blank=True)
    wind_avg = models.FloatField(null=True, blank=True)
    gust_max = models.FloatField(null=True, blank=True)
    time = models.DateTimeField()
    label = models.CharField(max_length=100)
    solar_radiation = models.FloatField(null=True, blank=True)
    water_loss = models.FloatField(null=True, blank=True)
    risk = models.FloatField(null=True, blank=True)
    geolocation = models.ForeignKey('Geolocation')

    class Meta:
        managed = True
        db_table = 'geolocation_records'


class Geolocation(models.Model):
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=100)
    lat = models.FloatField()
    lng = models.FloatField()
    is_field = models.BooleanField(default=False)
    crop = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'geolocation'


class Prediction(models.Model):
    id = models.AutoField(primary_key=True)
    time = models.DateTimeField()
    temp_avg = models.FloatField(null=True, blank=True)
    humidity_avg = models.FloatField(null=True, blank=True)
    label = models.CharField(max_length=100)
    solar_radiation = models.FloatField(null=True, blank=True)
    water_loss = models.FloatField(null=True, blank=True)
    water_actual = models.FloatField(null=True, blank=True)

    geolocation = models.ForeignKey('Geolocation')

    class Meta:
        managed = True
        db_table = 'field_prediction'


class Crop(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    # decision = models.BooleanField(default=False)

    class Meta:
        managed = True
        db_table = 'crop'


class Decision(models.Model):
    id = models.AutoField(primary_key=True)
    demand = models.FloatField(null=True, blank=True)
    crop_inventory_init = models.FloatField(null=True, blank=True)
    time = models.DateTimeField(null=True, blank=True)
    month = models.IntegerField(unique=True, null=True, blank=True)

    decision_flag = models.IntegerField(null=True, blank=True)
    tmp_grow = models.FloatField(null=True, blank=True)
    tmp_import = models.FloatField(null=True, blank=True)
    crop_inventory = models.FloatField(null=True, blank=True)
    cost = models.FloatField(null=True, blank=True)
    env = models.FloatField(null=True, blank=True)

    class Meta:
        managed = True
        db_table = 'decision'

class ImportCountries(models.Model):
    id = models.AutoField(primary_key=True)
    full_name = models.CharField(null=True, blank=True, max_length=100)
    abbr = models.CharField(unique=True, max_length=100)
    quantity_import = models.FloatField(null=True, blank=True)
    rank = models.IntegerField(null=True, blank=True)

    class Meta:
        managed = True
        db_table = 'import_countries'