from django.shortcuts import render_to_response
from django.template import RequestContext
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import permission_classes, api_view

from .serializers import RecordSerializer
from .models import Records
from rest_framework import status, permissions
from .permissions import IsOwnerOrReadOnly



class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    queryset = Records.objects.all()


    search_fields = ('api_secret', 'direction', 'sysTime', 'dateString')
    filter_fields = ('id','api_secret', 'direction', 'sysTime')

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.record)
    permission_classes = (permissions.AllowAny,)

    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        if (self.request.user.is_authenticated()):
            serializer.save(owner=self.request.user)
        else:
            print("some authentication need to be done mate!")
            print(self.request.data)
            print(self.request.META.get("HTTP_API_SECRET"))
            print(self.args)
            print(self.headers.get("Api-Secret"))


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def store_cmg_record(request):
    print("HTTP POST working mate!")

    # Add custom authentication based on secret key


    print(request.META.get("HTTP_API_SECRET"))
    return Response({"message": "Hello, world!"})