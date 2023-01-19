from django.urls import path
from .views import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views  # For reset password


urlpatterns = [
    path("login/", signin, name="login"),
    path("signout/", signout, name="signout"),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('profile-photo-ajax/', profile_photo_ajax, name="profile-photo-ajax"),
    path('update-notification-nav-ajax/', update_notification_nav_ajax,
         name="update-notification-nav-ajax"),
]
