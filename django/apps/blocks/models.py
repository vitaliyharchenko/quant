from django.core.urlresolvers import reverse
from django.db import models
from polymorphic.models import PolymorphicModel
#from django_markdown.models import MarkdownField


# All lessons contains blocks (text, chioce, question with float answer)
class Block(PolymorphicModel):
    time = models.IntegerField('Время в минутах на выполнение блока', blank=True)
    score = models.IntegerField('Балл за верное выполнение блока', blank=True, default=0)

    def __str__(self):
        title = None

        try:
            title = self.textblock.title
        except AttributeError:
            pass

        try:
            title = self.choiceblock.question_text[:100]
        except AttributeError:
            pass

        try:
            title = self.floatblock.question_text[:100]
        except AttributeError:
            pass

        if title:
            return title
        else:
            return u'Block #{}'.format(self.id)

    class Meta:
        verbose_name = 'блок'
        verbose_name_plural = 'блоки'

    def get_absolute_url(self):
        return reverse('blocks', args=[self.id])


class TextBlock(Block):
    title = models.CharField(max_length=200, unique=True)
    #body = MarkdownField()
    body = models.CharField(max_length=600)

    class Meta:
        verbose_name = 'текстовая статья'
        verbose_name_plural = 'текстовые статьи'

    def __str__(self):
        return self.title


class ChoiceBlock(Block):
    #question_text = MarkdownField('Текст вопроса')
    question_text = models.CharField('Текст вопроса', max_length=600)
    image = models.ImageField('Картинка', upload_to='choice_blocks/', null=True, blank=True)

    class Meta:
        verbose_name = 'тестовый вопрос'
        verbose_name_plural = 'тестовые вопросы'

    def __str__(self):
        return self.question_text


class ChoiceBlockOption(models.Model):
    choice_block = models.ForeignKey(ChoiceBlock, related_name='choices', on_delete=models.CASCADE)
    option_text = models.CharField('Вариант ответа', max_length=600, blank=True)
    option_image = models.ImageField('Картинка', upload_to='choice_block_options/', null=True, blank=True)
    help_text = models.CharField('Подсказка', max_length=300, blank=True)
    is_true = models.BooleanField('Правильный?')

    class Meta:
        verbose_name = 'вариант ответа на тестовый вопрос'
        verbose_name_plural = 'варианты ответа на тестовые вопросы'

    def __str__(self):
        return self.option_text


class FloatBlock(Block):
    #question_text = MarkdownField('Текст вопроса')
    question_text = models.CharField('Текст вопроса', max_length=600)
    image = models.ImageField('Картинка', upload_to='float_questions/', null=True, blank=True)
    answer = models.FloatField('Ответ')

    class Meta:
        verbose_name = 'задача с численным ответом'
        verbose_name_plural = 'задачи с численным ответом'

    def __str__(self):
        return self.question_text

class TextAnswerBlock(Block):
    #question_text = MarkdownField('Текст вопроса')
    question_text = models.CharField('Текст вопроса', max_length=600)
    image = models.ImageField('Картинка', upload_to='float_questions/', null=True, blank=True)
    answer = models.CharField('Ответ', max_length=600)

    class Meta:
        verbose_name = 'задача с текстовым ответом'
        verbose_name_plural = 'задачи с текстовым ответом'

    def __str__(self):
        return self.question_text

# Включение блоков в урок
class NodeBlockRelation(models.Model):
    node = models.ForeignKey('nodes.Node')
    block = models.ForeignKey(Block)
    order = models.IntegerField('Порядковый номер блока внутри узла', default=0)

    class Meta:
        verbose_name = 'включение блока в узел'
        verbose_name_plural = 'включения блоков в узел'

    def __str__(self):
        return "{} in {}".format(self.block, self.node)
