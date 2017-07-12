from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .models import Task
from .serializers import TaskSerializer
from apps.lessons.models import LessonNodeRelation
from apps.blocks.models import NodeBlockRelation
from apps.blocks.serializers import BlockSerializer

@csrf_exempt
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

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