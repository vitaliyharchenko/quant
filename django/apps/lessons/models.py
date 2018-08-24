from django.db import models
from apps.tags.models import SubjectTag
from apps.nodes.models import Node

# Nodes - nodes of learning graph
def sortByOrder(rel):
    return rel.order

class Lesson(models.Model):
    title = models.CharField('Название урока', max_length=300)
    subject_tag = models.ForeignKey(SubjectTag, on_delete=models.CASCADE)
    about = models.TextField('Описание урока')
    time = models.PositiveSmallIntegerField('Время на урок', default=20) # нужно подумать над этим

    class Meta:
        verbose_name = 'урок'
        verbose_name_plural = 'уроки'

    def __str__(self):
        return self.title

    @property
    def lesson_node_relations(self):
        return LessonNodeRelation.objects.filter(lesson=self)

    @property
    def nodes_of_lesson(self):
        relations = [rel for rel in self.lesson_node_relations]
        relations.sort(key=sortByOrder) 
        return [rel.node.pk for rel in relations]


class LessonNodeRelation(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    node = models.ForeignKey(Node, on_delete=models.CASCADE)
    order = models.IntegerField('Порядковый номер узла внутри урока', default=0)

    class Meta:
        verbose_name = 'включение узла в урок'
        verbose_name_plural = 'включения узла в урок'

    def __str__(self):
        return "{} in {}".format(self.node, self.lesson)

