from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils import timezone
from apps.tasks.models import Task
from apps.users.models import User
from apps.blocks.models import Block


class Result(models.Model):
    student = models.ForeignKey(User, verbose_name=u'Ученик')
    date = models.DateTimeField(default=timezone.now)
    score = models.IntegerField(null=True, blank=True)
    max_score = models.IntegerField()

    class Meta:
        verbose_name = 'результат'
        verbose_name_plural = 'результаты'


class TaskResult(Result):
    task = models.ForeignKey(Task, verbose_name=u'Урок')

    class Meta:
        verbose_name = 'результат задания'
        verbose_name_plural = 'результаты заданий'

    def __str__(self):
        return u'{}, {}, {}'.format(self.student, self.task, self.date)

    @property
    def task_result_block_result_relations(self):
        return TaskResultBlockResultRelation.objects.filter(lesson_result=self)



# =================
# Results of blocks
# =================
class BlockResult(Result):
    block = models.ForeignKey(Block)

    class Meta:
        verbose_name = 'результат ответа на блок'
        verbose_name_plural = 'результаты ответов на блоки'

    def __str__(self):
        return u'{}, {}, {}'.format(self.student, self.block, self.date)


class ChoiceBlockResult(BlockResult):
    choices = ArrayField(models.IntegerField())

    class Meta:
        verbose_name = 'результат ответа на тестовый вопрос'
        verbose_name_plural = 'результаты ответов на тестовые вопросы'


class FloatBlockResult(BlockResult):
    answer = models.FloatField('Ответ')

    class Meta:
        verbose_name = 'результат ответа на задачу'
        verbose_name_plural = 'результаты ответов на задачи'

class TextAnswerBlockResult(BlockResult):
    correct_answers = ArrayField(models.CharField(max_length=100))
    class Meta:
        verbose_name = 'результат ответа на задание с текстовым ответом'
        verbose_name_plural = 'результаты ответов на задание с текстовым ответом'

# ========================
# Relation between results
# ========================
class TaskResultBlockResultRelation(models.Model):
    task_result = models.ForeignKey(TaskResult)
    block_result = models.ForeignKey(BlockResult)

    class Meta:
        verbose_name = 'связь результата задания с результатом блока'
