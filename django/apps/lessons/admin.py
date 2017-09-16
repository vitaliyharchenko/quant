from django.contrib import admin
from .models import Lesson, LessonNodeRelation

class LessonNodeRelationInline(admin.TabularInline):
    model = LessonNodeRelation
    extra = 1

class LessonAdmin(admin.ModelAdmin):
    inlines = [LessonNodeRelationInline]


admin.site.register(Lesson, LessonAdmin)
