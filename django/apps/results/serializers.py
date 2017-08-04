from rest_framework import serializers
from .models import TaskResult, BlockResult, TextAnswerBlockResult, FloatBlockResult, ChoiceBlockResult, TextBlockResult, TaskResultBlockResultRelation
from apps.blocks.models import Block





class BlockResultSerializer(serializers.ModelSerializer):
    def get_serializer(self, block_type):
        if block_type == "textanswerblock":
            return TextAnswerBlockResultSerializer()
        elif block_type == "textblock":
            return TextBlockResultSerializer()
        elif block_type == "choiceblock":
            return ChoiceBlockResultSerializer()
        elif block_type == "floatblock":
           return FloatBlockResultSerializer()
        return super(BlockResultSerializer())

    class Meta:
        model = BlockResult


class TextBlockResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextBlockResult
        fields = '__all__'
        depth = 5

class ChoiceBlockResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChoiceBlockResult
        fields = '__all__'

class TextAnswerBlockResultSerializer(serializers.ModelSerializer):
    # choices = ChoiceBlockOptionSerializer(many=True, read_only=True)

    class Meta:
        model = TextAnswerBlockResult
        fields = '__all__'
        depth = 5

class FloatBlockResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = FloatBlockResult
        fields = '__all__'
        depth = 5


class TaskResultSerializer(serializers.ModelSerializer):
    # blocks = BlockResultSerializer(many=True, read_only=True)

    class Meta:
        model = TaskResult
        fields = ('task', 'student')

    def create(self, validated_data):
        student_id = validated_data.pop('student')
        task_id = validated_data.pop('task')
        task_result = TaskResult.objects.create(student=student_id, task=task_id)
        blocks_data = validated_data.pop('blocks')
        for block_id in blocks_data:
            block_data = blocks_data[block_id]
            block = Block.objects.get(pk=block_id)
            serializer = BlockResultSerializer().get_serializer(block_data.pop("block_type"))
            block_result = serializer.create(dict(student=student_id, block=block, answer=block_data.pop("answer")))
            block_result.set_score()
            TaskResultBlockResultRelation.objects.create(task_result=task_result, block_result=block_result)
        task_result.set_score()
        return task_result

