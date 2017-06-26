from django.contrib import admin
from .models import Block, TextBlock, ChoiceBlock, ChoiceBlockOption, NodeBlockRelation

admin.site.register(Block)
admin.site.register(NodeBlockRelation)
admin.site.register(TextBlock)
admin.site.register(ChoiceBlock)
admin.site.register(ChoiceBlockOption)