from apps.api.views import AuthMixin
from django.http import JsonResponse
from rest_framework.views import APIView
from .models import Block
from .serializers import BlockSerializer


class BlockDetailView(AuthMixin, APIView):
    def get(self, request, pk, format=None):
        try:
            block = Block.objects.get(pk=pk)
        except Exception as e:
            return JsonResponse({'Error message': str(e)}, status=404)
        serializer = BlockSerializer(block)
        return JsonResponse(serializer.data, status=200)
