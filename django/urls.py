"""

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import RedirectView

from apps.react import views as react_views
from rest_framework.authtoken import views as authtoken_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^users/', include('apps.users.urls', namespace='users')),
    # url(r'^tasks/', include('apps.tasks.urls', namespace='tasks')),
    url(r'^app/', include('apps.react.urls', namespace='react')),
    url(r'^landings/', include('apps.landings.urls', namespace='landings')),
    url(r'^api/', include('apps.api.urls', namespace='api')),
    url(r'^markdown/', include( 'django_markdown.urls')),
    url(r'^$', RedirectView.as_view(pattern_name='landings:main', permanent=False), name='index'),
]

# django-debug-toolbar
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]

# Auth with REST
urlpatterns += [
    url(r'^api-token-auth/$', authtoken_views.obtain_auth_token)
]
