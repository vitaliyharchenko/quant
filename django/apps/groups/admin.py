from django.contrib import admin
from .models import StudentGroup, StudentGroupRelation, CourseGroupRelation

admin.site.register(StudentGroup)
admin.site.register(StudentGroupRelation)
admin.site.register(CourseGroupRelation)