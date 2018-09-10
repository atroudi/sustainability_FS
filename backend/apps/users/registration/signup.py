from django.contrib.auth import login, authenticate
from backend.apps.users.registration.forms import SignUpForm
from django.shortcuts import render, redirect

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=email, password=raw_password)
            login(request, user)
            next = request.POST.get('next', '/')
            return redirect(next)
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})