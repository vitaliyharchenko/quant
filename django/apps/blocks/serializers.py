from rest_framework import serializers
from .models import Block, TextBlock, ChoiceBlock, FloatBlock

class BlockSerializer(serializers.ModelSerializer):
    class Meta:
    	model = Block

    def to_representation(self, obj):
        """
        Because Block is Polymorphic
        """
        if isinstance(obj, TextBlock):
            return TextBlockSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, ChoiceBlock):
           return ChoiseBlockSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, FloatBlock):
           return FloatBlockSerializer(obj, context=self.context).to_representation(obj)
        return super(BlockSerializer, self).to_representation(obj)
    # def get_serializer(self, obj):
    #     serializer = None
    #     try:
    #         serializer = TextBlockSerializer(obj, context=self.context)
    #     except Exception as e:
    #         pass
    #     try:
    #         serializer = FloatBlockSerializer(obj)
    #     except Exception as e:
    #         pass
    #     try:
    #         serializer = ChoiseBlockSerializer(obj)
    #     except Exception as e:
    #         pass
    #     if serializer:
    #         return serializer


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