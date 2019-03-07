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

    geolocation = models.ForeignKey('Geolocation')

    class Meta:
        managed = True
        db_table = 'geolocation_records'


class Geolocation(models.Model):
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=100)
    lat = models.FloatField()
    lng = models.FloatField()
    is_field = models.BooleanField(default=False);

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