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

    def to_representation(self, obj):
        """
        Block is Polymorphic
        """
        if isinstance(obj, TextAnswerBlockResult):
            return TextAnswerBlockResultSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, FloatBlockResult):
           return FloatBlockResultSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, ChoiceBlockResult):
           return ChoiceBlockResultSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, TextBlockResult):
           return TextBlockResultSerializer(obj, context=self.context).to_representation(obj)
        return super(BlockSerializer, self).to_representation(obj)


    class Meta:
        model = BlockResult


class TextBlockResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextBlockResult
        fields = '__all__'


class ChoiceBlockResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChoiceBlockResult
        fields = '__all__'


class TextAnswerBlockResultSerializer(serializers.ModelSerializer):
    # choices = ChoiceBlockOptionSerializer(many=True, read_only=True)

    class Meta:
        model = TextAnswerBlockResult
        fields = '__all__'


class FloatBlockResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = FloatBlockResult
        fields = '__all__'
    def create(self, validated_data):
        answer = validated_data.pop('answer')
        student_id = validated_data.pop('student')
        block_id = validated_data.pop('block')
        block_result = FloatBlockResult.objects.create(student=student_id, block=block_id)
        if answer == "":
            block_result.answer = None
        else:
            block_result.answer = answer
        return block_result



class TaskResultSerializer(serializers.ModelSerializer):
    blocks = BlockResultSerializer(many=True, read_only=True)

    class Meta:
        model = TaskResult
        fields = ('task', 'student', 'blocks')
        depth = 2

    def to_representation(self, obj):
    # return dict
        task_block_relations = TaskResultBlockResultRelation.objects.filter(task_result=obj)
        block_results = {}
        for relation in task_block_relations:
            block_results[relation.block_result.pk] = BlockResultSerializer(relation.block_result).to_representation(relation.block_result)
        return {
            'student': obj.student.pk,
            'date': obj.date,
            'score': obj.score,
            'max_score': obj.max_score,
            'task': obj.task.pk,
            'blocks': block_results,
    	}

    def create(self, validated_data):
        student_id = validated_data.pop('student')
        task_id = validated_data.pop('task')
        task_result = TaskResult.objects.create(student=student_id, task=task_id)
        blocks_data = validated_data.pop('blocks')
        for block_id in blocks_data:
            block_data = blocks_data[block_id]
            block = Block.objects.get(pk=block_id)
            serializer = BlockResultSerializer().get_serializer(block.polymorphic_ctype.model)
            block_result = serializer.create(dict(student=student_id, block=block, answer=block_data.pop('answer')))
            block_result.set_score()
            TaskResultBlockResultRelation.objects.create(task_result=task_result, block_result=block_result)
        task_result.set_score()
        return task_result

