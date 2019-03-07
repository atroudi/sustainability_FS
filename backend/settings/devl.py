import os

from .common import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '))a)f_b#(lo_v@cov$o)g*r8a$7%#51+*)&ybpy3!qz-8e__e1'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

DATABASES = {
    'default': {

        # DEVELOPMENT INIT DB
        'ENGINE': 'django.db.backends.postgresql',
        'USER': 'migiwara',
        'PASSWORD': 'root',
        'HOST':'localhost',
        'PORT':'5432',
        'NAME': 'biosustainabilitydb',

        # DOCKER INIT DB

        # 'ENGINE': 'django.db.backends.postgresql',
        # 'USER': 'biosensorsadmin',
        # 'NAME': 'biosensorsdb',
        # 'PASSWORD': 'qatar123',
        # 'HOST': 'db'
    }
}

INTERNAL_IPS = ('127.0.0.1', 'localhost',)

INSTALLED_APPS += (
    'autofixture',
)

STATICFILES_DIRS.append(
    os.path.join(BASE_DIR, os.pardir, 'frontend', 'build'),
)

APPEND_SLASH = True
# trailing_slash = False
# CSRF_COOKIE_SECURE = False


# CELERY CONFIG
CELERY_BROKER_URL = 'amqp://localhost'

# CELERY STUFF
BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'redis://localhost:6379'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
# CELERY_TIMEZONE = 'Africa/Nairobi'

# if DEBUG:
#    INTERNAL_IPS = ('127.0.0.1', 'localhost',)
#    MIDDLEWARE_CLASSES += (
#        'debug_toolbar.middleware.DebugToolbarMiddleware',
#    )
#
#    INSTALLED_APPS += (
#        'debug_toolbar',
#    )
#
#    DEBUG_TOOLBAR_PANELS = [
#        'debug_toolbar.panels.versions.VersionsPanel',
#        'debug_toolbar.panels.timer.TimerPanel',
#        'debug_toolbar.panels.settings.SettingsPanel',
#        'debug_toolbar.panels.headers.HeadersPanel',
#        'debug_toolbar.panels.request.RequestPanel',
#        'debug_toolbar.panels.sql.SQLPanel',
#        'debug_toolbar.panels.staticfiles.StaticFilesPanel',
#        'debug_toolbar.panels.templates.TemplatesPanel',
#        'debug_toolbar.panels.cache.CachePanel',
#        'debug_toolbar.panels.signals.SignalsPanel',
#        'debug_toolbar.panels.logging.LoggingPanel',
#        'debug_toolbar.panels.redirects.RedirectsPanel',
#    ]
#
#    DEBUG_TOOLBAR_CONFIG = {
#        'INTERCEPT_REDIRECTS': False,
#    }
#
# # Redis configuration
# CACHES = {
#     "default": {
#         "BACKEND": "django_redis.cache.RedisCache",
#         "LOCATION": "redis://127.0.0.1:6379/1",
#         "OPTIONS": {
#             "CLIENT_CLASS": "django_redis.client.DefaultClient"
#         },
#         "KEY_PREFIX": "biosustainability"
#     }
# }
