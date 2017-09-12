from django.conf.urls import url
from apps.tasks.views import TaskListViewSet, TaskDetailView, TaskResultView
from apps.groups.views import GroupDetailView, GroupLessonResultView, GroupCoursesViewSet
from apps.blocks.views import BlockDetailView
from apps.courses.views import CourseLessonsViewSet
from apps.users.views import UserRegisterView, UserGroupsViewSet

urlpatterns = [
    url(r'^tasks/$', TaskListViewSet.as_view(), name="task_set"),
    url(r'^users/register/$', UserRegisterView.as_view(), name="user_register"),
    url(r'^tasks/(?P<pk>[0-9]+)/$', TaskDetailView.as_view(), name="task_detail"),
    url(r'^tasks/result/(?P<pk>[0-9]+)/$', TaskResultView.as_view(), name="task_result"),
    url(r'^groups/$', UserGroupsViewSet.as_view(), name="my_groups_set"),
    url(r'^groups/(?P<pk>[0-9]+)/$', GroupDetailView.as_view(), name="group_detail"),
    url(r'^groups/(?P<group>[0-9]+)/result/(?P<lesson>[0-9]+)/$', GroupLessonResultView.as_view(), name="group_lesson_result"),
    url(r'^groups/(?P<group>[0-9]+)/courses/$', GroupCoursesViewSet.as_view(), name="group_courses_set"),
    url(r'^blocks/(?P<pk>[0-9]+)/$', BlockDetailView.as_view(), name="block_detail"),
    url(r'^courses/(?P<pk>[0-9]+)/lessons/$', CourseLessonsViewSet.as_view(), name="course_lessons_set")
]