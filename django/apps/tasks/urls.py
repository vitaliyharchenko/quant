from django.conf.urls import url
from .views import TaskListViewSet, TaskDetailViewSet

urlpatterns = [
    url(r'^$', TaskListViewSet.as_view(), name="main"),
    url(r'^(?P<pk>[0-9]+)$', TaskDetailViewSet.as_view(), name="task"),
]