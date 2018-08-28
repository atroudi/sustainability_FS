from django.db import models


class Records(models.Model):
    id = models.AutoField(primary_key=True)

    owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
    highlighted = models.TextField()

    # api_secret refers to user password
    api_secret = models.CharField(max_length=100)

    sgv = models.IntegerField()
    direction = models.CharField(max_length=100)

    date = models.DateTimeField()
    dateString = models.CharField(max_length=100)

    rawData = models.CharField(max_length=500)

    class Meta:
        managed = True
        db_table = 'patient_records'
