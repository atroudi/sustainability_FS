from rest_framework import viewsets
from .serializers import RecordSerializer
from .models import Records
from rest_framework import status, permissions


class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    queryset = Records.objects.all()

    permission_classes = (permissions.AllowAny,)

    search_fields = ('api_secret', 'direction', 'date', 'dateString')
    filter_fields = ('api_secret', 'direction', 'date')

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.record)
