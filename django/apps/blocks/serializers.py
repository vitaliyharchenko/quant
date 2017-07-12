from rest_framework import serializers
from .models import TextBlock, ChoiceBlock, FloatBlock

class BlockSerializerFactory:
	def get_serializer(self, obj):
		serializer = None
		try:
			serializer = TextBlockSerializer(obj)
		except Exception as e:
			raise e
		if serializer:
			return serializer


class TextBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextBlock
        fields = '__all__'
        depth = 5

class ChoiceBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChoiceBlock
        fields = '__all__'
        depth = 5

class FloatBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = FloatBlock
        fields = '__all__'
        depth = 5