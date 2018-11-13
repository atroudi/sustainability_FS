from sys import path
from rest_framework.routers import DefaultRouter
from .views import RecordViewSet
from .views import store_cmg_record
from rest_framework.routers import SimpleRouter
from django.conf.urls import url

#################################### ADAPTING WITH NIGHTSCOUT
'''
Removing trailing slash
'''
class OptionalSlashRouter(SimpleRouter):

    def __init__(self):
        self.trailing_slash = '/?'
        super(SimpleRouter, self).__init__()

'''
ViewSet routing is not properly with nightscout App
'''
router = OptionalSlashRouter()
router.register(r'entries', RecordViewSet)
urlpatterns = router.urls

'''
URL pattern compatible with nightscout mobile app
'''
urlpatterns = [
    # ex: /polls/
    url(r'entries', store_cmg_record, name='entries')
]

################################################################### END ADAPTING WITH NIGHT SCOUT

router = DefaultRouter()
router.register(r'records', RecordViewSet)
urlpatterns = router.urls

# Example of inserting new record
# curl -v -H "Content-Type: application/json" -XPOST 'http://127.0.0.1:8000/api/records/' -d '{"api_secret": "hhh", "sgv": 1, "direction": "hh", "date": "2018-05-24T17:11:17.138+0301", "dateString": "hh", "rawData": "hh"}'