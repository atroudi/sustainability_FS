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
        'NAME': 'biosensorsdb',

# DOCKER INIT DB

        # 'ENGINE': 'django.db.backends.postgresql',
        # 'USER': 'biosensorsadmin',
        # 'NAME': 'biosensorsdb',
        # 'PASSWORD': 'qatar123',
        # 'HOST': 'db'
    }
}

INTERNAL_IPS = ['192.168.56.1']
2222
INSTALLED_APPS += (
    'autofixture',
)

STATICFILES_DIRS.append(
    os.path.join(BASE_DIR, os.pardir, 'frontend', 'build'),
)

APPEND_SLASH = False
# trailing_slash = False
# CSRF_COOKIE_SECURE = False