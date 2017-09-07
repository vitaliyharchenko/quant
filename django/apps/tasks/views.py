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
from apps.results.serializers import TaskResultSerializer
from apps.results.models import TaskResult
from apps.api.views import AuthMixin


class TaskListViewSet(AuthMixin, generics.ListAPIView):
    # renderer_classes = (JSONRenderer,)
    # queryset = Task.objects.all()
    # serializer_class = TaskSerializer

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        # queryset = Task.objects.all()
        queryset = Task.objects.filter(student=request.user)
        serializer = TaskSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)

class TaskDetailView(AuthMixin, APIView):
    # @csrf_protect
    def get(self, request, pk, format=None):
        try:
            task = Task.objects.get(pk=pk)
        except Exception as e:
            return JsonResponse({'Error message': str(e)}, status=404)
        task_serializer = TaskSerializer(task)
        task_data = task_serializer.data
        lesson_node_reations = LessonNodeRelation.objects.filter(lesson=task.lesson)
        data = {}
        nodes = {}
        blocks = {}
        for relation in lesson_node_reations:
            nodes[relation.node.pk] = {}
            nodes[relation.node.pk]["title"] = relation.node.title
            blocks_of_node = relation.node.blocks_of_node
            nodes[relation.node.pk]["blocks"] = [block.pk for block in blocks_of_node]
            for block in blocks_of_node:
                blocks[block.pk] = BlockSerializer(block).data
        data["task"] = task_data
        data["nodes"] = nodes
        data["blocks"] = blocks
        return JsonResponse(data, status=200)

class TaskResultView(AuthMixin, APIView):
    def post(self, request, pk, format=None):
        try:
            data = JSONParser().parse(request)
            serializer = TaskResultSerializer(data=data)
            if serializer.is_valid():
                serializer.save(blocks=data.pop('blocks'))
                return JsonResponse({'Status':'OK'}, status=200)
            return JsonResponse({'Validation error': serializer.errors}, status=401)
        except Exception as e:
            return JsonResponse({'Error message': str(e)}, status=400)

    def get(self, request, pk, format=None):
        results = TaskResult.objects.filter(task=Task.objects.get(pk=pk))
        serializer = TaskResultSerializer(results, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
        # try:
        #     results = TaskResult.objects.filter(task=Task.objects.get(pk=pk))
        #     serializer = TaskResultSerializer(results, many=True)
        #     return JsonResponse(serializer.data, safe=False, status=200)
        # except Exception as e:
        #     return JsonResponse({'Error message': str(e)}, status=404)

