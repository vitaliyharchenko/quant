from django.shortcuts import render


# Create your views here.
def example(request):
	return render(request, 'landing.html')


def landing(request, class_num, subject):
	tpl_path = 'landings/{}/{}.html'.format(class_num, subject)
	action = request.GET.get('action')
	return render(request, tpl_path, {'action': action, 'subject': subject, 'class_num': class_num})