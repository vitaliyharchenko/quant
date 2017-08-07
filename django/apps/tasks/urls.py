from django.conf.urls import url
from .views import TaskListViewSet, TaskDetailViewSet, TaskResult

urlpatterns = [
    url(r'^$', TaskListViewSet.as_view(), name="main"),
    url(r'^(?P<pk>[0-9]+)$', TaskDetailViewSet.as_view(), name="task"),
    url(r'^result/(?P<pk>[0-9]+)$', TaskResult.as_view(), name="result"), 
]