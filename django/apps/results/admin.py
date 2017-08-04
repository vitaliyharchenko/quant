from django.contrib import admin
from .models import Result, TaskResult, BlockResult, TextBlockResult, FloatBlockResult, ChoiceBlockResult, TextAnswerBlockResult, TaskResultBlockResultRelation

admin.site.register(Result)
admin.site.register(TaskResult)
admin.site.register(BlockResult)
admin.site.register(TextAnswerBlockResult)
admin.site.register(TextBlockResult)
admin.site.register(ChoiceBlockResult)
admin.site.register(FloatBlockResult)
admin.site.register(TaskResultBlockResultRelation)