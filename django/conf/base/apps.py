INSTALLED_APPS = [
    # Django core apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.flatpages',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third party
    'polymorphic',

    # Custom apps
    'apps.users',
    'utils',
    'apps.blocks',
    'apps.nodes',
    'apps.tasks',
    'apps.results',
    'apps.lessons',
    'apps.tags'
]
