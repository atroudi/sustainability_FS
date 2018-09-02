from .models import Snippet
from .serializers import SnippetSerializer
from rest_framework import generics
from django.contrib.auth import get_user_model

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from .permissions import IsOwnerOrReadOnly

# @permission_classes((permissions.AllowAny,))
class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    # permission_classes = (permissions.AllowAny,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        # if not (self.request.user.is_authenticated()):
        serializer.save(owner=self.request.user)


# @permission_classes((permissions.AllowAny,))
class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    # permission_classes = (permissions.AllowAny,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('emailuser-list', request=request, format=format),
        'snippets': reverse('snippet-list', request=request, format=format)
    })


from rest_framework import renderers
from rest_framework.response import Response

class SnippetHighlighted(generics.GenericAPIView):
    queryset = Snippet.objects.all()
    renderer_classes = (renderers.StaticHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)