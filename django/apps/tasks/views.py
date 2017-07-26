from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import generics 
from rest_framework.views import APIView
from .models import Task
from .serializers import TaskSerializer
from apps.lessons.models import LessonNodeRelation
from apps.blocks.models import NodeBlockRelation
from apps.blocks.serializers import BlockSerializer

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated



class AuthMixin(object):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class TaskListViewSet(AuthMixin, generics.ListAPIView):
    renderer_classes = (JSONRenderer,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskDetailViewSet(AuthMixin, APIView):
    # @csrf_protect
    def get(self, request, pk, format=None):
        try:
            task = Task.objects.get(pk=pk)
        except Exception:
            return HttpResponse(status=404)
        task_serializer = TaskSerializer(task)
        task_data = task_serializer.data
        lesson_node_reations = LessonNodeRelation.objects.filter(lesson=task.lesson)
        data = {}
        nodes = {}
        blocks = {}
        for relation in lesson_node_reations:
            nodes[relation.node.pk] = {}
            nodes[relation.node.pk]["title"] = relation.node.title
            node_block_relations = NodeBlockRelation.objects.filter(node=relation.node)
            nodes[relation.node.pk]["blocks"] = [block.pk for block in node_block_relations]
            for entry in node_block_relations:
                blocks[entry.block.pk] = BlockSerializer(entry.block).data
        data["task"] = task_data
        data["nodes"] = nodes
        data["blocks"] = blocks
        return JsonResponse(data)
