from rest_framework import serializers
from .models import Lesson, LessonNodeRelation

class LessonSerializer(serializers.ModelSerializer):
    """
    
    """
    
    
    class Meta:
        model = Lesson
        fields = '__all__'
        depth = 5

class LessonNodeRelationSerializer(serializers.ModelSerializer):
    """
    
    """
    class Meta:
        model = LessonNodeRelation
        fields = '__all__'
        depth = 5