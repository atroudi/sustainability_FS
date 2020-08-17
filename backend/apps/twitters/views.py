from rest_framework import viewsets
from .serializers import TwitterSerializer
from .models import Twitter
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse, Http404, JsonResponse
import tweepy
from rest_framework.decorators import api_view




class TwitterViewSet(viewsets.ModelViewSet):
    serializer_class = TwitterSerializer
    queryset = Twitter.objects.all()

