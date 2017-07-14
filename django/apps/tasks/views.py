from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import generics 
from .models import Task
from .serializers import TaskSerializer
from apps.lessons.models import LessonNodeRelation
from apps.blocks.models import NodeBlockRelation
from apps.blocks.serializers import BlockSerializer

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .permissions import IsProjectAdminUser


# ===========example==================

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class ExampleView(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)

# =======================================

class AdminAuthMixin(object):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class TaskListViewSet(AdminAuthMixin, generics.ListAPIView):
    renderer_classes = (JSONRenderer,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskList(generics.ListAPIView):
    renderer_classes = (JSONRenderer,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


@csrf_exempt
def task_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Exception:
        return HttpResponse(status=404)

    if request.method == 'GET':
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
