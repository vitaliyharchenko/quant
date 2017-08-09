from django.conf.urls import url
from apps.tasks.views import TaskListViewSet, TaskDetailView, TaskResultView
from apps.groups.views import GroupDetailView

urlpatterns = [
    url(r'^tasks/$', TaskListViewSet.as_view(), name="task_set"),
    url(r'^tasks/(?P<pk>[0-9]+)/$', TaskDetailView.as_view(), name="task_detail"),
    url(r'^tasks/result/(?P<pk>[0-9]+)/$', TaskResultView.as_view(), name="task_result"),
    url(r'^groups/(?P<pk>[0-9]+)/$', GroupDetailView.as_view(), name="group_detail")
]