from django.db import models


class Records(models.Model):
    id = models.IntegerField(primary_key=True)

    # api_secret refers to user password
    api_secret = models.CharField(max_length=100)

    sgv = models.IntegerField()
    direction = models.CharField(max_length=100)

    date = models.IntegerField()
    dateString = models.DateTimeField()

    rawData = models.CharField(max_length=500)

    class Meta:
        managed = False
        db_table = 'patientRecords'
