from django.contrib.auth.models import User
from django.db import models
from django.core.validators import RegexValidator

phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                             message="Телефон должен быть заполнен в формате: '+999999999'. Максимум 15 цифр.")

# Model, contains extra info about user.
class User(models.Model):

    STUDENT = 'ST'
    TEACHER = 'TH'
    PARENT = 'PR'
    USER_TYPE_CHOICES = (
        (STUDENT, 'Ученик'),
        (TEACHER, 'Учитель'),
        (PARENT, 'Родитель'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(u'Дата рождения', null=True, blank=True)
    email_confirmed = models.BooleanField(u'Почта подтверждена', default=False)
    is_complete = models.BooleanField(u'Профиль активен (имеется вся информация)', default=False)
    avatar = models.ImageField(u'Аватар профиля', upload_to='avatars', null=True, blank=True)
    avatar_url = models.CharField(u'Ссылка на аватар профиля', max_length=255, null=True, blank=True)
    phone = models.CharField(u'Контактный телефон', validators=[phone_regex], blank=True, max_length=20)
    profile_type = models.CharField(u'Тип пользователя', max_length=2, choices=USER_TYPE_CHOICES, default=STUDENT)
    city = models.CharField(u'Город', max_length=100, null=True, blank=True)
    grade = models.PositiveSmallIntegerField(u'Класс', null=True, blank=True)
    school = models.CharField(u'Учебное заведние', max_length=100, null=True, blank=True)

    class Meta:
        verbose_name = "данные пользователя"
        verbose_name_plural = "данные пользователя"
        app_label = "users"

    def get_absolute_url(self):
        return reverse('users', args=[self.id])

    def __str__(self):
        return "{}".format(self.pk)


