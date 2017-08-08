from django.conf.urls import url
from apps.tasks.views import TaskListViewSet, TaskDetailViewSet, TaskResultView

urlpatterns = [
    url(r'^tasks/$', TaskListViewSet.as_view(), name="task_set"),
    url(r'^tasks/(?P<pk>[0-9]+)/$', TaskDetailViewSet.as_view(), name="task_detail"),
    url(r'^tasks/result/(?P<pk>[0-9]+)/$', TaskResultView.as_view(), name="task_result"), 
]