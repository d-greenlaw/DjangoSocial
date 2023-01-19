from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth import get_user_model
User = get_user_model()


class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254)
    birth_day = forms.DateTimeField(required=True,
                           widget=forms.TextInput(attrs={'class': 'form-control', 
                           'placeholder': '01/01/1950'}))
    class Meta:
        model = User
        fields = [
            'email',
            'handle',
            'birth_day',
            'password1',
            'password2',
        ]
