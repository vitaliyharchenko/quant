from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils import timezone
from polymorphic.models import PolymorphicModel
from apps.tasks.models import Task
from apps.users.models import User
from apps.blocks.models import Block, ChoiceBlockOption


class Result(PolymorphicModel):
    student = models.ForeignKey(User, verbose_name=u'Ученик')
    date = models.DateTimeField(default=timezone.now)
    score = models.IntegerField(null=True, blank=True)
    max_score = models.IntegerField(null=True, blank=True)

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
        return TaskResultBlockResultRelation.objects.filter(task_result=self)

    def set_score(self):
        self.max_score = 0
        self.score = 0
        for rel in self.task_result_block_result_relations:
            self.max_score += rel.block_result.max_score
            self.score += rel.block_result.score
        self.save()


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

    def set_score(self, cur_score=None):
        self.max_score = self.block.score
        if cur_score:
            if cur_score <= self.max_score:
                self.score = cur_score

class TextBlockResult(BlockResult):
    answer = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'результат изучения текстового блока'
        verbose_name_plural = 'результаты изучения текстовых блоков'

    def set_score(self, cur_score=None):
        self.max_score = self.block.score
        if cur_score:
            if cur_score <= self.max_score:
                self.score = cur_score
        else:
            if self.answer:
                self.score = self.max_score
        self.save()

class ChoiceBlockResult(BlockResult):
    answer = ArrayField(models.IntegerField()) # ссылки на id choiseBlockOptions

    class Meta:
        verbose_name = 'результат ответа на тестовый вопрос'
        verbose_name_plural = 'результаты ответов на тестовые вопросы'

    def set_score(self, cur_score=None):
        choices = ChoiceBlockOption.objects.filter(choice_block=self.block)
        self.max_score = 0
        self.score = 0
        if cur_score:
            if cur_score <= self.max_score:
                self.score = cur_score
        else:
            for ch in choices:
                if ch.is_true:
                    self.max_score += 1
                    if ch.id in self.answer:
                        self.score += 1
        self.save()

class FloatBlockResult(BlockResult):
    answer = models.FloatField('Ответ', null=True)

    class Meta:
        verbose_name = 'результат ответа на задачу'
        verbose_name_plural = 'результаты ответов на задачи'

    def set_score(self, cur_score=None):
        self.max_score = self.block.score
        correct_answer = self.block.answer
        if cur_score:
            if cur_score <= self.max_score:
                self.score = cur_score
        else:
            if self.answer == correct_answer:
                self.score = self.max_score
        self.save()

class TextAnswerBlockResult(BlockResult):
    answer = models.CharField(max_length=100, null=True) # ответ, который дал ученик

    class Meta:
        verbose_name = 'результат ответа на задание с текстовым ответом'
        verbose_name_plural = 'результаты ответов на задание с текстовым ответом'

    def set_score(self, cur_score=None):
        self.max_score = self.block.score
        correct_answer = self.block.answer
        if cur_score:
            if cur_score <= self.max_score:
                self.score = cur_score
        else:
            if self.answer == correct_answer:
                self.score = self.max_score
        self.save()

# ========================
# Relation between results
# ========================
class TaskResultBlockResultRelation(models.Model):
    task_result = models.ForeignKey(TaskResult)
    block_result = models.ForeignKey(BlockResult)

    class Meta:
        verbose_name = 'связь результата задания с результатом блока'
