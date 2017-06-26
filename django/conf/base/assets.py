# TODO: see how is it correct https://github.com/phpdude/docker-django-webpack-skeleton/blob/master/project/settings/base/assets.py
import os

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'

# Сюда упадут все файлы на production после collectstatic
# Важно не использовать STATICFILES_FINDERS на production, а например nginx 
STATIC_ROOT = os.path.join(BASE_DIR, "static/")

# В этих директориях django ищет статические файлы.
# Если не находит, то ищет с помощью django.contrib.staticfiles.finders.AppDirectoriesFinder,
# которая проверяет папку static каждого установленного в проекте приложения
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'assets'),

)

# В режиме разработки — python manage.py runserver — Django ищет статичные файлы с помощью них
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

# пользователи должны лишь единожды скачивать ресурсы!
# хеширование включается только в режиме DEBUG=false
# Вам понадобится перезапускать свой проект, используя python manage.py startapp, при каждом изменении шаблона.
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'
