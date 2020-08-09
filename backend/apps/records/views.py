import time

from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import RecordSerializer, PredictionSerializer, CropSerializer, DecisionSerializer, ImportCoutriesSerializer
from .serializers import GeolocationSerializer
from .models import Record, Crop, Decision, ImportCountries
from .models import Geolocation
from .models import Prediction
from rest_framework import status, permissions
from .tasks import hello
from .tasks import load_model
from .decision_task import decision
from time import sleep

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
    search_fields = ('crop')
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

        week = self.request.query_params.get('week')
        print(week)

        if week:
            load_model.delay(int(week))

        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CropViewSet(viewsets.ModelViewSet):
    serializer_class = CropSerializer
    queryset = Crop.objects.all()
    permission_classes = (permissions.AllowAny,)
    def list(self, request, *args, **kwargs):

        # print("list crop")
        # demand = int(self.request.query_params.get('demand'))
        # print(demand)
        # crop = self.request.query_params.get('crop')
        # print(crop)
        # load_model.delay(demand)

        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            test = serializer.data
            print(test + [serializer.data[0]])

            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        print(serializer.data)
        return Response(serializer.data)

class DecisionViewSet(viewsets.ModelViewSet):
    serializer_class = DecisionSerializer
    queryset = Decision.objects.all()
    permission_classes = (permissions.AllowAny,)

    def list(self, request, *args, **kwargs):

        print("list crop")
        demand = self.request.query_params.get('demand')
        print(demand)
        crop = self.request.query_params.get('crop')
        print(crop)
        month = self.request.query_params.get('month')
        print(month)
        if demand and month:
            result = decision.delay(int(demand), int(month))

            counter = 0
            counter_max = 10
            while not result.ready() and counter < counter_max:
                print("waiting for decision task to finish...")
                sleep(0.5)
                counter += 1
                print("finished decision task")

        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            test = serializer.data
            # print(serializer.data)

            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        print(serializer.data)
        return Response(serializer.data)

class ImportCountriesViewSet(viewsets.ModelViewSet):
    serializer_class = ImportCoutriesSerializer
    queryset = ImportCountries.objects.all()
    permission_classes = (permissions.AllowAny,)
