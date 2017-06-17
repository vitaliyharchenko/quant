# TODO: see how is it correct https://github.com/phpdude/docker-django-webpack-skeleton/blob/master/project/settings/base/assets.py
import os

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, "static/")

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'assets/dist'),
)
