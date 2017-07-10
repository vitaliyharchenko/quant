from django.contrib import admin
from .models import Lesson, LessonNodeRelation

admin.site.register(Lesson)
admin.site.register(LessonNodeRelation)