from rest_framework import serializers
from .models import StudentGroup, StudentGroupRelation
from django.contrib.auth.models import User

class StudentGroupRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentGroupRelation
        fields = '__all__'
        depth = 2



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id',)

class StudentGroupSerializer(serializers.ModelSerializer):
    rel = UserSerializer(source='students_of_group', many=True)

    class Meta:
        model = StudentGroup
        fields = ('id', 'title', 'teacher', 'about', 'rel')
        depth = 2

