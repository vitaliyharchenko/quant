from django.contrib import admin
from .models import ClientRequest


class ClientRequestAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_display = ('name', 'email', 'phone', 'class_num', 'subject', 'datetime', 'call_date', 'phone_status', 'client_status',)
    list_filter = ('class_num', 'datetime', 'call_date', 'phone_status', 'client_status',)
    search_fields = ('name', 'email', 'phone', 'class_num', 'subject', 'datetime', 'call_date', 'phone_status', 'client_status')

admin.site.register(ClientRequest, ClientRequestAdmin)