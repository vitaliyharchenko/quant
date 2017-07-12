from django.db import models

from django.core.urlresolvers import reverse
from django.db import models

from apps.tags.models import SubjectTag

# Nodes - nodes of learning graph

class Node(models.Model):
    
    DEFINITION = "DF"
    METHOD = "MT"
    NODE_TYPE_CHOICES = (
        (DEFINITION, 'Понятие'),
        (METHOD, 'Метод')
    )

    title = models.CharField('Название объекта', max_length=300)
    subject_tag = models.ForeignKey(SubjectTag)
    node_type = models.CharField(u'Тип узла', max_length=2, choices=NODE_TYPE_CHOICES, default=DEFINITION)

    class Meta:
        verbose_name = 'Узел'
        verbose_name_plural = 'Узлы'

    def __str__(self):
        return self.title


# Relation objects between nodes
# NodeRelation
class NodeRelation(models.Model):
    STRONG ='ST'
    WEAK = 'WK'
    RELATIONS_TYPE_CHOICES = (
        (STRONG, 'Сильная'),
        (WEAK, 'Слабая'),
    )

    parent = models.ForeignKey(Node, verbose_name=u'Parent', related_name=u'parent_in_node_relation')
    child = models.ForeignKey(Node, verbose_name=u'Child', related_name=u'child_in_node_relation')
    relation_type = models.CharField(u'Тип связи', max_length=2, choices=RELATIONS_TYPE_CHOICES, default=WEAK)

    class Meta:
        verbose_name = 'Связь между узлами'
        verbose_name_plural = 'Связи между узлами'

    def __str__(self):
        return "{} in {}".format(self.child, self.parent)
