from django.db import models

from django.core.urlresolvers import reverse
from django.db import models
from apps.tags.models import SubjectTag
from apps.nodes.models import Node

# Nodes - nodes of learning graph


class Lesson(models.Model):
    title = models.CharField('Название урока', max_length=300)
    subject_tag = models.ForeignKey(SubjectTag)
    about = models.TextField('Описание урока')
    time = models.PositiveSmallIntegerField('Время на урок', default=20) # нужно подумать над этим

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


class LessonNodeRelation(models.Model):
    lesson = models.ForeignKey(Lesson)
    node = models.ForeignKey(Node)

    class Meta:
        verbose_name = 'включение узла в урок'
        verbose_name_plural = 'включения узла в урок'

    def __str__(self):
        return "{} in {}".format(self.node, self.lesson)
