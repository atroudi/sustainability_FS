from rest_framework.routers import DefaultRouter

from .views import RecordViewSet

router = DefaultRouter()
router.register(r'records', RecordViewSet)
urlpatterns = router.urls



# Example of inserting new record
# curl -v -H "Content-Type: application/json" -XPOST 'http://127.0.0.1:8000/api/records/' -d '{"api_secret": "hhh", "sgv": 1, "direction": "hh", "date": "2018-05-24T17:11:17.138+0301", "dateString": "hh", "rawData": "hh"}'