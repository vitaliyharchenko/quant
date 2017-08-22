from django.db import models
from django.utils import formats, timezone


class ClientRequest(models.Model):
    
    # Phone statuses
    CALL_BACK_NEEDED = 'NC'
    WE_CALLED = 'WС'
    THEY_CALLED = 'TС'
    PHONE_STATUS_CHOICES = (
        (CALL_BACK_NEEDED, 'Нужно сделать обратный звонок'),
        (WE_CALLED, 'Мы позвонили'),
        (THEY_CALLED, 'Клиент нам дозвонился'),
    )

    # Client statuses
    OTHER_CONTACTS = 'OT'
    CALL_ORDERED = 'CO'
    RECIEVE_TEST = 'RT'
    FINISH_TEST = 'FT'
    INVITE_TO_MEETING = 'IM'
    VISIT_MEETING = 'VM'
    OUR_CLIENT = 'OC'
    GONE_OUT = 'GO'
    CLIENT_STATUS_CHOICES = (
        (OTHER_CONTACTS, 'Пришел по другим каналам'),
        (CALL_ORDERED, 'Заказал обратный звонок'),
        (RECIEVE_TEST, 'Начал проходить тестирование'),
        (FINISH_TEST, 'Прошел тестирование'),
        (INVITE_TO_MEETING, 'Приглашен на собеседование'),
        (VISIT_MEETING, 'Посетил собеседование'),
        (OUR_CLIENT, 'Является нашим клиентом'),
        (GONE_OUT, 'Ушел от нас'),
    )

    name = models.CharField(verbose_name=u'Имя клиента', max_length=255, null=True, blank=True)
    email = models.CharField(verbose_name=u'Email', max_length=32, blank=True, default=None, null=True)
    phone = models.CharField(verbose_name=u'Телефон', max_length=32, blank=True, default=None, null=True)
    subject = models.CharField(verbose_name=u'Предмет', max_length=255)
    class_num = models.CharField(verbose_name=u'Класс', max_length=255)
    datetime = models.DateTimeField(verbose_name=u'Время первого обращения', default=timezone.now)

    phone_status = models.CharField(u'Статус звонка', max_length=2, choices=PHONE_STATUS_CHOICES, default=CALL_BACK_NEEDED)
    call_date = models.DateTimeField(verbose_name=u'Время последнего звонка', default=timezone.now)

    client_status = models.CharField(u'Статус клиента', max_length=2, choices=CLIENT_STATUS_CHOICES, default=CALL_ORDERED)

    admin_comments = models.TextField()
    

    class Meta:
        verbose_name = "Запрос клиента"
        verbose_name_plural = "Запросы клиентов"
        app_label = "landings"

    def __str__(self):
        return u'{}, {}, Предмет: "{}, {}класс", {}, {}, {}'.format(
            formats.date_format(self.datetime, "SHORT_DATETIME_FORMAT"),
            self.name,
            self.subject,
            self.class_num,
            self.email,
            self.get_client_status_display(),
            self.get_phone_status_display()
        )