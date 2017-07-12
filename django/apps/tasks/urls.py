from django.conf.urls import url
from . import views
from .views import TaskList

urlpatterns = [
    url(r'^$', TaskList.as_view(), name="main"),
    url(r'^(?P<pk>[0-9]+)$', views.task_detail, name="task"),
]