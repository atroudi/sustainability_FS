import time

from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import RecordSerializer, PredictionSerializer
from .serializers import GeolocationSerializer
from .models import Record
from .models import Geolocation
from .models import Prediction
from rest_framework import status, permissions
from .tasks import hello
from .tasks import load_model

class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    queryset = Record.objects.all()
    search_fields = ('geolocation__id','geolocation__id')
    permission_classes = (permissions.AllowAny,)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


    def retrieve(self, request, *args, **kwargs):
        # hello.delay()
        print(request.data)
        # start_time = time.time()
        instance = self.get_object()
        # elapsed_time = time.time() - start_time
        # print('data retrieve overhead is %d' % elapsed_time)
        serializer = self.get_serializer(instance)
        print(serializer.data)
        return Response(serializer.data)

class GeolocationViewSet(viewsets.ModelViewSet):
    serializer_class = GeolocationSerializer
    queryset = Geolocation.objects.all()
    permission_classes = (permissions.AllowAny,)


class PredictionViewSet(viewsets.ModelViewSet):
    serializer_class = PredictionSerializer
    queryset = Prediction.objects.all()
    search_fields = ('geolocation__id','geolocation__id')
    permission_classes = (permissions.AllowAny,)
    i = 0

    def retrieve(self, request, *args, **kwargs):
        hello.delay()
        start_time = time.time()
        instance = self.get_object()
        elapsed_time = time.time() - start_time
        print('data retrieve overhead is %d' % elapsed_time)
        serializer = self.get_serializer(instance)


    def list(self, request, *args, **kwargs):

        week = int(self.request.query_params.get('week'))
        print(week)
        load_model.delay(week)

        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)



    # def retrieve(self, request, *args, **kwargs):
    #     hello.delay()
    #     print("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHh")
        # start_time = time.time()
        # instance = self.get_object()
        # elapsed_time = time.time() - start_time
        # print('data retrieve overhead is %d' % elapsed_time)
        # serializer = self.get_serializer(instance)