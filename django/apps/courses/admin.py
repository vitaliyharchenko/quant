from django.contrib import admin
from .models import Course, CourseLessonRelation

class CourseLessonRelationInline(admin.TabularInline):
    model = CourseLessonRelation
    extra = 1

class CourseAdmin(admin.ModelAdmin):
    inlines = [CourseLessonRelationInline]


admin.site.register(Course, CourseAdmin)
