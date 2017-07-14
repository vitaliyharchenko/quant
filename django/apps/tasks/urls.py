from django.conf.urls import url
from . import views
from .views import TaskListViewSet, ExampleView

urlpatterns = [
    url(r'^$', TaskListViewSet.as_view(), name="main"),
    url(r'^example/$', ExampleView.as_view(), name="main"),
    url(r'^(?P<pk>[0-9]+)$', views.task_detail, name="task"),
]