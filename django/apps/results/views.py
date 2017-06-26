from django.shortcuts import render

# Create your views here.
def example(request):
    return render(request, 'index.html')


def styleguide(request):
    return render(request, 'styleguide.html')