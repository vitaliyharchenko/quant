from rest_framework import serializers
from apps.serializers import ObjectSerializer


class UserSerializer(ObjectSerializer):
    """
    
    """
    def to_representation(self, obj):
        super(ObjectSerializer, self).to_representation()


    def to_inital_value(self, data):
        user = data.get("user") # каскадом как-то нужно сделать 
        birth_date = data.get("birth_date")
        email_confirmed = data.get("email_confirmed")
        is_complete = data.get("is_complete")
        avatar = data.get("avatar")
        avatar_url = data.get("avatar_url")
        phone = data.get("phone")
        profile_type = data.get("profile_type")
        city = data.get("city")
        grade = data.get("grade")
        school = data.get("school")

        return {
            "phone": phone,
            "grade": int(grade)
        }

    def create(self, validated_data):
        return User.objects.create(**validated_data)

