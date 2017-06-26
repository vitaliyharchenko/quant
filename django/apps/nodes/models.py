from django.db import models

from django.core.urlresolvers import reverse
from django.db import models

from blocks.models import NodeBlockRelation
from task.models import LessonTaskRelation

# Nodes - nodes of learning graph

class SubjectTag(models.Model):
    title = models.CharField('Название объекта', max_length=300)

    def __str__(self):
        return self.title


class Node(models.Model):
    title = models.CharField('Название объекта', max_length=300)
    subject_tag = models.ForeignKey(SubjectTag)

    class Meta:
        verbose_name = 'Узел'
        verbose_name_plural = 'Узлы'

    def __str__(self):
        return self.title


class Subject(Node):
    image = models.ImageField('Картинка', upload_to='subjects/', null=True, blank=True)

    class Meta:
        verbose_name = 'Предмет'
        verbose_name_plural = 'Предметы'

    @property
    def subject_modules(self):
        return SubjectModuleRelation.objects.filter(parent=self)


class Lesson(models.Model):
	title = models.CharField('Название урока', max_length=300)
    subject_tag = models.ForeignKey(SubjectTag)
    about = models.TextField('Описание урока')
    time = models.PozitiveSmallIntegerField('Время на урок', default=20) # нужно подумать над этим

    class Meta:
        verbose_name = 'Урок'
        verbose_name_plural = 'Уроки'

    def get_absolute_url(self):
        return reverse('lessons', args=[self.id])

    def __str__(self):
        return self.title

    @property
    def lesson_node_relations(self):
        return LessonNodeRelation.objects.filter(lesson=self)


# Relation objects between nodes
# NodeRelation
class NodeRelation(models.Model):
    parent = models.ForeignKey(Node, verbose_name=u'Parent', related_name=u'parent_in_node_relation')
    child = models.ForeignKey(Node, verbose_name=u'Child', related_name=u'child_in_node_relation')

    class Meta:
        verbose_name = 'Связь между узлами'
        verbose_name_plural = 'Связи между узлами'

    def __str__(self):
        return "{} in {}".format(self.child, self.parent)


class LessonNodeRelation(models.Model):
    lesson = models.ForeignKey(Lesson)
    node = models.ForeignKey(Node)

    class Meta:
        verbose_name = 'включение узла в урок'
        verbose_name_plural = 'включения узла в урок'

    def __str__(self):
        return "{} in {}".format(self.node, self.lesson)
