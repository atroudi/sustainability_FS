from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

# urlpatterns = [
#     url(r'^snippets/$', views.snippet_list),
#     url(r'^snippets/(?P<pk>[0-9]+)$', views.snippet_detail),
# ]
# urlpatterns = [
#     url(r'^snippets/$', views.SnippetList.as_view()),
#     url(r'^snippets/(?P<pk>[0-9]+)/$', views.SnippetDetail.as_view()),
#     url(r'^$', views.api_root),
#     url(r'^snippets/(?P<pk>[0-9]+)/highlighted/$', views.SnippetHighlighted.as_view()),
# ]

# API endpoints
urlpatterns = [
    url(r'^$', views.api_root),
    url(r'^snippets/$', views.SnippetList.as_view(), name='snippet-list'),
    url(r'^snippets/(?P<pk>[0-9]+)/$', views.SnippetDetail.as_view(), name='snippet-detail'),
    url(r'^snippets/(?P<pk>[0-9]+)/highlight/$', views.SnippetHighlighted.as_view(), name='snippet-highlight'),
]

urlpatterns = format_suffix_patterns(urlpatterns)




# Example of inserting new snippet
# curl -v -H "Content-Type: application/json" -XPOST 'http://127.0.0.1:8000/snippets/' -d '{"code": "Flat3"}'

# New
# http -a 'anistroudi@gmail.com:qatar123' POST http://127.0.0.1:8000/snippets/ code="print 789"