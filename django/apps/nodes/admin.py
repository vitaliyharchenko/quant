from django.contrib import admin
from .models import Node, NodeRelation
from apps.blocks.models import NodeBlockRelation

class NodeBlockRelationInline(admin.TabularInline):
    model = NodeBlockRelation
    extra = 4

class NodeAdmin(admin.ModelAdmin):
    inlines = [NodeBlockRelationInline]


admin.site.register(Node, NodeAdmin)
admin.site.register(NodeRelation)
