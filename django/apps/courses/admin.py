from django.contrib import admin
from .models import Course, CourseLessonRelation

admin.site.register(Course)
admin.site.register(CourseLessonRelation)