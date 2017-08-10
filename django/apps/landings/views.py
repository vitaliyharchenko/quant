from django.shortcuts import render


# Create your views here.
def example(request):
	return render(request, 'landing.html')


def landing(request, class_num, subject):
	tpl_path = 'landings/{}/{}.html'.format(class_num, subject)
	return render(request, tpl_path)