from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

# urlpatterns = [
#     url(r'^snippets/$', views.snippet_list),
#     url(r'^snippets/(?P<pk>[0-9]+)$', views.snippet_detail),
# ]
urlpatterns = [
    url(r'^snippets/$', views.SnippetList.as_view()),
    url(r'^snippets/(?P<pk>[0-9]+)/$', views.SnippetDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)




# Example of inserting new snippet
# curl -v -H "Content-Type: application/json" -XPOST 'http://127.0.0.1:8000/api/records/' -d '{"code": "Flat3"}'