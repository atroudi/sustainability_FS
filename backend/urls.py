from sys import path

from django.conf.urls import url, include
from django.contrib.auth.views import login, logout_then_login
from backend.apps.users.registration.signup import signup
from django.contrib import admin

from .views import app, index
from backend.apps.twitters.sentimentAnalysisView import getSentiment
from django.conf import settings

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('users.urls')),
    url(r'^api/v1/', include('records.urls')),
    url(r'^api/v1/', include('twitters.urls')),
    url(r'^', include('snippets.urls')),
    url(r'^twitter/', getSentiment, name='twitter'),

    url(r'^app/', app, name='app'),
    url('^auth/login/$', login, name='login'),
    url('^auth/login/signup/$', signup, name='signup'),
    url('^auth/logout/$', logout_then_login, name='logout'),
    url('^$', index, name='index'),
]

# if settings.DEBUG:
#     import debug_toolbar
#
#     print("DEBUGGGGGGGGGG MATE!")
#     urlpatterns += [
#         url(r'^__debug__/', include(debug_toolbar.urls)),
#     ]