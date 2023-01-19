import random
import textwrap
from django.contrib import messages
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from .forms import *
from django.views.generic import View
from django.http import JsonResponse


def profile_photo_ajax(request):
    profile = get_user_model().objects.get(id=request.user.id)
    profile_photo = '/media/' + str(profile.profile_photo)

    return JsonResponse({'profile_photo': profile_photo})


def update_notification_nav_ajax(request):
    # Badge/Counter - returns single object
    # Message notification counts
    msg_notif_count = request.user.get_unread_notification_count()
    msg_notif_count = msg_notif_count.get("unread_message_notification_count")
    # Comment notification counts
    cmt_notif_count = request.user.get_unread_notification_count()
    cmt_notif_count = cmt_notif_count.get("unread_comment_notification_count")
    # Friend Request notification counts
    frd_req_notif_count = request.user.get_unread_notification_count()
    frd_req_notif_count = frd_req_notif_count.get(
        "unread_friend_request_notification_count")
    # Friend Request Accepted notification counts
    frd_req_accepted_notif_count = request.user.get_unread_notification_count()
    frd_req_accepted_notif_count = frd_req_accepted_notif_count.get(
        "unread_accepted_friend_request_notification_count")
    # Friend Request Rejected notification counts
    frd_req_rejected_notif_count = request.user.get_unread_notification_count()
    frd_req_rejected_notif_count = frd_req_rejected_notif_count.get(
        "unread_rejected_friend_request_notification_count")
    # Add all friend request notifications together
    frd_req_notif_count = frd_req_notif_count + \
        frd_req_accepted_notif_count + frd_req_rejected_notif_count
    # Dropdown - returns object
    # Message notifications
    msg_notif_list = request.user.get_unread_notifications()
    msg_notif_list = msg_notif_list.get("unread_message_notifications")
    # Comment notifications
    cmt_notif_list = request.user.get_unread_notifications()
    cmt_notif_list = cmt_notif_list.get("unread_comment_notifications")
    # Friend Request notifications
    frd_req_notif_list = request.user.get_unread_notifications()
    frd_req_notif_list = frd_req_notif_list.get(
        "unread_friend_request_notifications")
    # Accepted Request notifications
    frd_req_accepted_notif_list = request.user.get_unread_notifications()
    frd_req_accepted_notif_list = frd_req_accepted_notif_list.get(
        "unread_accepted_friend_request_notifications")
    # Rejected Request notifications
    frd_req_rejected_notif_list = request.user.get_unread_notifications()
    frd_req_rejected_notif_list = frd_req_rejected_notif_list.get(
        "unread_rejected_friend_request_notifications")
    # Set empty lists
    msg_notif = []
    cmt_notif = []
    frd_req_notif = []
    # Add Message notifications
    for notification in msg_notif_list:
        item = {
            'notification_id': notification.id,  # Just in case / or for delete
            'message_sender_id': notification.message.sender.id,  # For linking to thread
            'message_sender_photo': str(notification.message.sender.profile_photo),
            'message_sender_handle': notification.message.sender.handle,
            'message_created': notification.message.created.strftime("%m/%d/%Y, %I:%M %p"),
            'message_body': notification.message.message_body[:20]
        }
        msg_notif.append(item)
    # Add Comment notifications
    for notification in cmt_notif_list:
        item = {
            'notification_id': notification.id,  # Just in case / or for delete
            'comment_post_id': notification.comment.post.id,  # For linking to post
            'comment_author_photo': str(notification.comment.author.profile_photo),
            'comment_author_handle': notification.comment.author.handle,
            'comment_created': notification.comment.created.strftime("%m/%d/%Y, %I:%M %p"),
            'comment': notification.comment.comment[:20],
        }
        cmt_notif.append(item)
    # Add all friend requests related notifications to one list
    for notification in frd_req_notif_list:
        item = {
            'notification_id': notification.id,  # Just in case / or for delete
            'friend_request_sender_friend_count': str(notification.pending_friend_request.get_friends_count()),
            # For linking to profile
            'friend_request_sender_id': notification.pending_friend_request.id,
            'friend_request_sender_profile_photo': str(notification.pending_friend_request.profile_photo),
            'friend_request_sender_handle': notification.pending_friend_request.handle,
        }
        frd_req_notif.append(item)
    for notification in frd_req_accepted_notif_list:
        item = {
            'notification_id': notification.id,  # Just in case / or for delete
            'friend_request_sender_friend_count': str(notification.accepted_friend_request.get_friends_count()),
            # For linking to profile
            'friend_request_sender_id': notification.accepted_friend_request.id,
            'friend_request_sender_profile_photo': str(notification.accepted_friend_request.profile_photo),
            'friend_request_sender_handle': notification.accepted_friend_request.handle,
        }
        frd_req_notif.append(item)
    for notification in frd_req_rejected_notif_list:
        item = {
            'notification_id': notification.id,  # Just in case / or for delete
            'friend_request_sender_friend_count': str(notification.rejected_friend_request.get_friends_count()),
            # For linking to profile
            'friend_request_sender_id': notification.rejected_friend_request.id,
            'friend_request_sender_profile_photo': str(notification.rejected_friend_request.profile_photo),
            'friend_request_sender_handle': notification.rejected_friend_request.handle,
        }
        frd_req_notif.append(item)

    return JsonResponse({
        'msg_notif_count': msg_notif_count,
        'cmt_notif_count': cmt_notif_count,
        'frd_req_notif_count': frd_req_notif_count,
        'msg_notif': msg_notif,
        'cmt_notif': cmt_notif,
        'frd_req_notif': frd_req_notif,
    })


class SignUpView(View):
    form_class = SignUpForm
    template_name = 'registration/signup.html'

    def get(self, request):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            return redirect('login')

        return render(request, self.template_name, {'form': form})


def signin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.info(request, "Username or Password is not correct.")
    return render(request, 'registration/login.html', {})


def signout(request):
    signOffItemList = [
        "Thanks for stoppin' by " + request.user.first_name + "! 🤠",
        "It was great seeing you " + request.user.first_name + "! 🙌",
        "Talk to you soon " + request.user.first_name + "! 🥳",
        "Have an awesome week " + request.user.first_name + "! 🙏",
    ]
    # get rand num between 1 and the count of the list above
    randNum = random.randint(0, 2)
    for value, signOffItem in enumerate(signOffItemList):
        if value == randNum:
            messages.success(request, (signOffItem))
    logout(request)
    return redirect('login')
