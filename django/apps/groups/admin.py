from django.contrib import admin
from .models import StudentGroup, StudentGroupRelation, CourseGroupRelation


class CourseGroupRelationInline(admin.TabularInline):
    model = CourseGroupRelation
    extra = 1

class StudentGroupRelationInline(admin.TabularInline):
    model = StudentGroupRelation
    extra = 4

class StudentGroupAdmin(admin.ModelAdmin):
    inlines = [StudentGroupRelationInline, CourseGroupRelationInline]


admin.site.register(StudentGroup, StudentGroupAdmin)
