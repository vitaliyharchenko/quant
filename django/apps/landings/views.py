from django.shortcuts import render


# Create your views here.
def example(request):
	return render(request, 'landing.html')
