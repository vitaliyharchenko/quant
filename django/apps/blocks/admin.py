from django.contrib import admin
from .models import Block, TextBlock, FloatBlock, ChoiceBlock, ChoiceBlockOption, TextAnswerBlock, NodeBlockRelation


class ChoiceBlockOptionInline(admin.TabularInline):
    model = ChoiceBlockOption
    extra = 4

class ChoiceBlockAdmin(admin.ModelAdmin):
    inlines = [ChoiceBlockOptionInline]


admin.site.register(Block)
admin.site.register(NodeBlockRelation)
admin.site.register(TextBlock)
admin.site.register(ChoiceBlock, ChoiceBlockAdmin)
admin.site.register(FloatBlock)
admin.site.register(TextAnswerBlock)