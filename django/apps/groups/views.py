from apps.api.views import AuthMixin
from django.http import JsonResponse
from rest_framework.views import APIView
from .models import StudentGroup
from .serializers import StudentGroupSerializer


class GroupDetailView(AuthMixin, APIView):
    # @csrf_protect
    def get(self, request, pk, format=None):
        try:
            group = StudentGroup.objects.get(pk=pk)
        except Exception as e:
            return JsonResponse({'Error message': str(e)}, status=404)
        serializer = StudentGroupSerializer(group)
        return JsonResponse(serializer.data, status=200)