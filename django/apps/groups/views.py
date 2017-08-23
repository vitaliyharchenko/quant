from apps.api.views import AuthMixin
from django.http import JsonResponse
from rest_framework.views import APIView
from .models import StudentGroup
from .serializers import StudentGroupSerializer
from apps.lessons.models import Lesson
from apps.tasks.models import Task
from apps.results.models import TaskResult
from apps.results.serializers import TaskResultSerializer
from apps.courses.serializers import CourseSerializer
from rest_framework import generics

class GroupDetailView(AuthMixin, APIView):
    def get(self, request, pk, format=None):
        try:
            group = StudentGroup.objects.get(pk=pk)
        except Exception as e:
            return JsonResponse({'Error message': str(e)}, status=404)
        serializer = StudentGroupSerializer(group)
        return JsonResponse(serializer.data, status=200)

class GroupCoursesViewSet(AuthMixin, generics.ListAPIView):
    def list(self, request, group, format=None):
        queryset = StudentGroup.objects.get(pk=group).courses_of_group
        serializer = CourseSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)

class GroupLessonResultView(AuthMixin, APIView):
    def get(self, request, group, lesson, format=None):
        try:
            group = StudentGroup.objects.get(pk=group)
            lesson = Lesson.objects.get(pk=lesson)
        except Exception as e:
            return JsonResponse({'Error message': str(e)}, status=404)
        data = {}
        for student in group.students_of_group:
            tasks_results = {}
            for task in Task.objects.filter(student=student, lesson=lesson):
                tasks_results[task.pk] = []
                for result in TaskResult.objects.filter(task=task):
                    tasks_results[task.pk].append(TaskResultSerializer(result).data)
                # -- 2 --
                # serializer = TaskResultSerializer(source=TaskResult.objects.filter(task=task), many=True)
                # tasks_results[task.pk] = serializer.data
                # -- 3 --
                # tasks_results[task.pk] = TaskResult.objects.filter(task=task) 
            data[student.pk] = tasks_results
        return JsonResponse(data, safe=False, status=200)
