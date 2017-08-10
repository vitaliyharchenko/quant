from rest_framework import serializers
from .models import Course

class CourseGroupSerializer(serializers.ModelSerializer):
    """
    
    """
    class Meta:
        model = Course
        fields = '__all__'
        depth = 2