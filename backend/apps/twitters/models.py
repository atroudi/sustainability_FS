from django.db import models

class Twitter(models.Model):
    id = models.AutoField(primary_key=True)
    twid = models.CharField(max_length=100)
    active = models.BooleanField(default=False)
    author = models.CharField(max_length=20)
    avatar = models.CharField(max_length=20)
    body = models.CharField(max_length=150)
    date = models.DateTimeField()
    screen_name = models.CharField(max_length=20)

    class Meta:
        managed = True
        db_table = 'tweets'