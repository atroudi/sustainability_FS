from django.db import models


class Records(models.Model):
    id = models.AutoField(primary_key=True)

    # api_secret refers to user password
    api_secret = models.CharField(max_length=100)

    sgv = models.IntegerField()
    direction = models.CharField(max_length=100)

    sysTime = models.DateTimeField()
    dateString = models.CharField(max_length=100)

    rawData = models.CharField(default="",max_length=500)

    owner = models.ForeignKey('users.EmailUser', related_name='records', on_delete=models.CASCADE)

    class Meta:
        managed = True
        db_table = 'patient_records'
