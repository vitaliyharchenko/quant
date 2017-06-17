from split_settings.tools import optional, include

include(
    # Load environment settings
    'base/env.py',
    optional('local/env.py'),  # We can "patch" any settings from local folder env.py file.

    # Here we should have the order because of dependencies
    'base/paths.py',
    'base/apps.py',
    'base/middleware.py',
    # 'base/debug_toolbar.py',

    # Load all other settings
    'base/*.py',

    optional('local/*.py'),  # we can load any other settings from local folder
)

# https://github.com/phpdude/docker-django-webpack-skeleton/blob/master/project/settings/base/
# TODO: add caches.py
# TODO: add emails.py
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/
