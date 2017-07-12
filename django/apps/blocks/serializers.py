from rest_framework import serializers
from .models import TextBlock, ChoiceBlock, FloatBlock

class BlockSerializerFactory:
	def get_serialiser(self, obj):
		serialiser = None
		try:
			serialiser = TextBlockSerializer(obj)
		except Exception as e:
			raise e
		if serialiser:
			return serialiser


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