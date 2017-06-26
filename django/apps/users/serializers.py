from rest_framework import serializers
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    """
    
    """
    class Meta:
        model = Profile
        fields = '__all__'
        depth = 2
        extra_kwargs = {'password': {'write_only': True}}

    # def create(self, validated_data):
    #     user = User(
    #         email=validated_data['email'],
    #         username=validated_data['username']
    #     )
    #     user.set_password(validated_data['password'])
    #     user.save()
    #     return user