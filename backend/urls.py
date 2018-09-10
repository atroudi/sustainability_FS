from django.conf.urls import url, include
from django.contrib.auth.views import login, logout_then_login
from backend.apps.users.registration.signup import signup
from django.contrib import admin

from .views import app, index

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('users.urls')),
    url(r'^api/', include('records.urls')),
    url(r'^', include('snippets.urls')),
    url(r'^app/', app, name='app'),
    url('^auth/login/$', login, name='login'),
    url('^auth/login/signup/$', signup, name='signup'),
    url('^auth/logout/$', logout_then_login, name='logout'),
    url('^$', index, name='index'),
]
