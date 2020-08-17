from rest_framework.routers import DefaultRouter

from .views import TwitterViewSet, gettweets

router = DefaultRouter()
router.register(r'twitters', TwitterViewSet)
# router.register(r'gettweets', gettweets)

urlpatterns = router.urls