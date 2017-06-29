from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.user_list, name="main"),
    url(r'^(?P<pk>[0-9]+)$', views.user_detail, name="user"),
]