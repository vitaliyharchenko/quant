from django.db import models
#from apps.nodes.models import Lesson
from apps.lessons.models import Lesson

# Tasks
class Task(models.Model):
    """
		Задание для конкретного ученика, связаное с уроком
	"""
    student = models.ForeignKey('auth.User', related_name='task_student', on_delete=models.CASCADE)
    teacher = models.ForeignKey('auth.User', related_name='task_teacher', on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    start_time = models.DateTimeField(null=True, blank=True)
    finish_time = models.DateTimeField(null=True, blank=True)
    is_finished = models.BooleanField('Закончил?', default=False)
    
    class Meta:
        verbose_name = 'задание для ученика'
        verbose_name_plural = 'задания для ученика'

    def __str__(self):
        return u'For {}, "{}"'.format(self.student, self.lesson)

