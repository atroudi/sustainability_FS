from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    operations = [
        migrations.CreateModel(
            name='Records',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('api_secret', models.CharField(max_length=100, verbose_name='api_secret')),
                ('sgv', models.IntegerField(blank=True, null=True, verbose_name='sgv')),
                ('direction', models.CharField(max_length=100,  verbose_name='superuser status')),
                ('date', models.DateTimeField(blank=True, null=True, verbose_name='Date')),
                ('dateString', models.CharField(max_length=100, verbose_name='Date String')),
                ('rawData', models.CharField(max_length=500, verbose_name='Raw Data')),
            ],
            # options={
            #     'db_table': 'patientRecords',
            #     'managed': True,
            # },
            # managers=[
            #     ('objects', django.contrib.auth.models.UserManager()),
            # ],
        ),
    ]
