from django.db import models
from apps.courses.models import Course

class StudentGroup(models.Model):
    title = models.CharField('Название группы', max_length=300)
    about = models.TextField('Описание группы')

    class Meta:
        verbose_name = 'группа'
        verbose_name_plural = 'группа'

    def __str__(self):
        return self.title

    @property
    def student_group_relations(self):
        return StudentGroupRelation.objects.filter(group=self)

    @property
    def students_of_group(self):
        return [rel.student for rel in self.student_group_relations]

    @property
    def teacher_group_relations(self):
        return TeacherGroupRelation.objects.filter(group=self)

    @property
    def teachers_of_group(self):
        return [rel.teacher for rel in self.teacher_group_relations]

    @property
    def course_group_relations(self):
        return CourseGroupRelation.objects.filter(group=self)

    @property
    def courses_of_group(self):
        return [rel.course for rel in self.course_group_relations]


class TeacherGroupRelation(models.Model):
    teacher = models.ForeignKey('auth.User', related_name='group_teacher') # куратор группы 
    group = models.ForeignKey(StudentGroup)
    class Meta:
        verbose_name = 'связь учителя или курастора с группой'
        verbose_name_plural = 'связи учителя или куратора с группой'

    def __str__(self):
        return u'Teacher {} of group {}'.format(self.teacher, self.group)



class StudentGroupRelation(models.Model):
    student = models.ForeignKey('auth.User', related_name='student')
    group = models.ForeignKey(StudentGroup)

    class Meta:
        verbose_name = 'связь ученика с группой'
        verbose_name_plural = 'связи учеников с группой'

    def __str__(self):
        return u'Student {} in group {}'.format(self.student, self.group)

class CourseGroupRelation(models.Model):
    course = models.ForeignKey(Course)
    group = models.ForeignKey(StudentGroup)
    start_time = models.DateTimeField(null=True, blank=True)
    finish_time = models.DateTimeField(null=True, blank=True)
    is_finished = models.BooleanField('Закончили?', default=False)

    class Meta:
        verbose_name = 'связь группы и курса'
        verbose_name_plural = 'связи групп и курсов'

    def __str__(self):
        return u'Group {} study {}'.format(self.group, self.course)