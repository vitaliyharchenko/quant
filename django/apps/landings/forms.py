from django import forms
from .models import ClientRequest

class ClientTestingRequestForm(forms.ModelForm):
    class Meta:
        model = ClientRequest
        fields = ('name', 'email')

    def clean(self):
        cleaned_data = self.cleaned_data
        email = cleaned_data.get("email")
        name = cleaned_data.get("name")

        # Check if that email is empty
        if not email:
            self.add_error('email', u"Укажите актуальный почтовый ящик")

        # Check if that email is empty
        if not name:
            self.add_error('name', u"Укажите имя")

        return cleaned_data


class ClientCallbackRequestForm(forms.ModelForm):
    class Meta:
        model = ClientRequest
        fields = ('name', 'phone')

    def clean(self):
        cleaned_data = self.cleaned_data
        phone = cleaned_data.get("phone")
        name = cleaned_data.get("name")

        # Check if that email is empty
        if not phone:
            self.add_error('phone', u"Укажите контактный номер")

        # Check if that email is empty
        if not name:
            self.add_error('name', u"Укажите имя")

        return cleaned_data