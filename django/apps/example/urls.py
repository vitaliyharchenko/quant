from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^text$', views.text_block, name="text_block"),
]