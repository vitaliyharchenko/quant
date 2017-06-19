from django.shortcuts import render

# Create your views here.
def example(request):
    return render(request, 'index.html')


def styleguide(request):
    return render(request, 'styleguide.html')


def text_block(request):
    return render(request, 'text_block.html')


def choice_block(request):
    return render(request, 'choice_block.html')