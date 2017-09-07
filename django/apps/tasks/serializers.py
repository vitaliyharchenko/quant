from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    """
    
    """
    owner = serializers.ReadOnlyField(source='student.pk')

    class Meta:
        model = Task
        fields = ('id', 'lesson', 'owner')
        depth = 5