from rest_framework import viewsets
from .serializers import RecordSerializer
from .models import Records


class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    queryset = Records.objects.all()
    search_fields = ('api_secret', 'direction', 'date', 'dateString')
    filter_fields = ('api_secret', 'direction', 'date')
