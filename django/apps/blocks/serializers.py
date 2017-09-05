from rest_framework import serializers
from .models import Block, TextBlock, TextAnswerBlock, ChoiceBlock, FloatBlock, ChoiceBlockOption

class BlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Block

    def to_representation(self, obj):
        """
        Block is Polymorphic
        """
        if isinstance(obj, TextBlock):
            return TextBlockSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, ChoiceBlock):
           return ChoiceBlockSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, FloatBlock):
           return FloatBlockSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, TextAnswerBlock):
           return TextAnswerBlockSerializer(obj, context=self.context).to_representation(obj)
        return super(BlockSerializer, self).to_representation(obj)

class TextBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextBlock
        fields = '__all__'
        depth = 5

class TextAnswerBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextAnswerBlock
        fields = '__all__'
        depth = 5

class ChoiceBlockOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChoiceBlockOption
        fields = ('id', 'option_text', 'option_image', 'help_text', 'is_true')

class ChoiceBlockSerializer(serializers.ModelSerializer):
    choices = ChoiceBlockOptionSerializer(many=True, read_only=True)

    class Meta:
        model = ChoiceBlock
        fields = ('id', 'time', 'score', 'polymorphic_ctype', 'question_text', 'choices')
        depth = 5

class FloatBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = FloatBlock
        fields = '__all__'
        depth = 5
