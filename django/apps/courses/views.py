from django.http import HttpResponse, JsonResponse
from rest_framework import generics 
from apps.api.views import AuthMixin
from apps.lessons.serializers import LessonSerializer
from .models import Course


class CourseLessonsViewSet(AuthMixin, generics.ListAPIView):
    def list(self, request, pk, format=None):
        # Note the use of `get_queryset()` instead of `self.queryset`
        # queryset = Task.objects.all()
        queryset = Course.objects.get(pk=pk).lessons_of_course
        serializer = LessonSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)