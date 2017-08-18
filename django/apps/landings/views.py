from django.shortcuts import render, redirect
from django.contrib import messages

from .forms import ClientTestingRequestForm, ClientCallbackRequestForm
from .models import ClientRequest


# Create your views here.
def main(request):

    if request.method == "POST":
        form = ClientCallbackRequestForm(request.POST)
        if form.is_valid():
            name = request.POST.get('name', '')
            phone = request.POST.get('phone', '')
            client_request = ClientRequest.objects.create(
                name=name,
                phone=phone,
                class_num='-',
                subject='-',
                client_status=ClientRequest.CALL_ORDERED
            )
            client_request.save()
            messages.success(request, "Спасибо за обращение! Мы перезвоним вам как только появится свободная минута 😊")
    else:
        form = ClientCallbackRequestForm()

    return render(request, 'landings/index.html',
        {
            'form': form
        })


def landing(request, class_num, subject):
    tpl_path = 'landings/{}/{}.html'.format(class_num, subject)
    action = request.GET.get('action')
    TESTING_URLS = {
        '11': {
            'eng': 'https://docs.google.com/forms/d/1qJaa2t14-MjYBCchPOp3hg4_gICflE4F_s_asmTc0BI/edit',
            'math': 'https://docs.google.com/forms/d/e/1FAIpQLSfDO7rk_VRqiPGqLkvItyYF5xwiGT8CQ35zpzl7MYbeJQYufA/viewform?usp=sf_link'
        }
    }

    if request.method == "POST":
        if action == 'testing':
            form = ClientTestingRequestForm(request.POST)
            if form.is_valid():
                name = request.POST.get('name', '')
                email = request.POST.get('email', '')
                client_request = ClientRequest.objects.create(
                    name=name,
                    email=email,
                    class_num=class_num,
                    subject=subject,
                    client_status=ClientRequest.RECIEVE_TEST
                )
                client_request.save()
                testing_url = TESTING_URLS[class_num][subject]
                return redirect(testing_url)
        else:
            form = ClientCallbackRequestForm(request.POST)
            if form.is_valid():
                name = request.POST.get('name', '')
                phone = request.POST.get('phone', '')
                client_request = ClientRequest.objects.create(
                    name=name,
                    phone=phone,
                    class_num=class_num,
                    subject=subject,
                    client_status=ClientRequest.CALL_ORDERED
                )
                client_request.save()
                messages.success(request, "Спасибо за обращение! Мы перезвоним вам как только появится свободная минута 😊")
    else:
        if action == 'testing':
            form = ClientTestingRequestForm()
        else:
            form = ClientCallbackRequestForm()


    return render(request, tpl_path,
        {
            'action': action,
            'subject': subject,
            'class_num': class_num,
            'form': form
        }
    )