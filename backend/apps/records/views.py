from rest_framework import viewsets
from .serializers import RecordSerializer
from .models import Records
from rest_framework import status, permissions
from .permissions import IsOwnerOrReadOnly

class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    queryset = Records.objects.all()

    permission_classes = (permissions.AllowAny,)

    search_fields = ('api_secret', 'direction', 'sysTime', 'dateString')
    filter_fields = ('api_secret', 'direction', 'sysTime')

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.record)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        # if not (self.request.user.is_authenticated()):
        serializer.save(owner=self.request.user)