from theapp.utils import *
from django.views.decorators.csrf import ensure_csrf_cookie
import random  # for random id generation
from bs4 import BeautifulSoup
import requests
from .models import *
from django.http import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from datetime import timezone
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
User = get_user_model()
# Scraping for metadata

"""###############################################################
        ##################### FEED #####################
###############################################################"""


@login_required(login_url='login')
def my_feed(request):
    context = {
    }
    return render(request, 'theapp/feed.html', context)

###### Feed Sidebar ######


@login_required(login_url='login')
def get_upcoming_birthdays_ajax(request):
    data = []
    friend_list = request.user.get_friends().order_by('birth_day')
    for friend in friend_list:
        days_until_birthday = getDaysUntilBirthday(friend.birth_day)
        if ":" in days_until_birthday:
            item = {
                'friend_id': friend.id,
                'birthday_is': 'Today',
                'friend_handle': friend.handle,
                'profile_photo': str(friend.profile_photo),
            }
            data.append(item)
        try:
            if int(days_until_birthday) == 1:
                item = {
                    'friend_id': friend.id,
                    'birthday_is': 'Tomorrow',
                    'friend_handle': friend.handle,
                    'profile_photo': str(friend.profile_photo),
                }
                data.append(item)
            if int(days_until_birthday) == 2:
                item = {
                    'friend_id': friend.id,
                    'birthday_is': 'In 2 Days',
                    'friend_handle': friend.handle,
                    'profile_photo': str(friend.profile_photo),
                }
                data.append(item)
            if int(days_until_birthday) == 3:
                item = {
                    'friend_id': friend.id,
                    'birthday_is': 'In 3 Days',
                    'friend_handle': friend.handle,
                    'profile_photo': str(friend.profile_photo),
                }
                data.append(item)
        except:
            pass
    return JsonResponse({'data': data})


@login_required(login_url='login')
def get_recent_events_ajax(request):
    data = []
    recent_events = CalendarEvent.objects.all().order_by('start')
    friend_list = request.user.get_friends()
    my_friends_events = []  # Only get events where this user is friends with the author
    for event in recent_events:
        if event.author in friend_list:
            my_friends_events.append(event)
    my_friends_events = my_friends_events[:4]  # Just get the last 4
    for event in my_friends_events:
        item = {
            'author_id': event.author.id,
            'author_handle': event.author.handle,
            'event_title': event.title,
            'event_starts': event.start.strftime("%m/%d/%Y, %I:%M %p"),
            'profile_photo': str(event.author.profile_photo),
        }
        data.append(item)
    return JsonResponse({'data': data})


@login_required(login_url='login')
def get_people_you_may_know_ajax(request):
    # FOR NOW THIS IS JUST PEOPLE YOU ARE NOT YET FRIENDS WITH
    data = []
    friend_list = request.user.get_friends()
    user_list = User.objects.all()
    for user in user_list:
        if user not in friend_list:  # If this user is not your friend already
            if user != request.user:  # If this user is not yourself
                mutual_friend_count = mutualFriendCount(user, friend_list)
                if mutual_friend_count >= 2:
                    mutual_friend_count = str(
                        mutual_friend_count) + ' Mutual Friends'
                    item = {
                        'person_id': user.id,
                        'person_handle': user.handle,
                        'profile_photo': str(user.profile_photo),
                        'person_joined': user.created.strftime("%m/%d/%Y"),
                        'mutual_friend_count': mutual_friend_count,
                    }
                    data.append(item)
    return JsonResponse({'data': data})


@login_required(login_url='login')
def post_details(request, pk):
    context = {
    }
    return render(request, 'theapp/post-details.html', context)


@login_required(login_url='login')
def post_details_ajax(request):
    """Grab the post Id in the url, load from that in front end"""
    if request.is_ajax():
        postId = request.POST.get('pk')
        post = SocialPost.objects.get(id=postId)
        data = []
        item = {
            'id': post.id,
            'body': post.post_body,
        }
        data.append(item)
    return JsonResponse({'data': data})

# ##################### Get URL Metadata (for Preview) AJAX  #####################


@login_required(login_url='login')
def get_url_metadata_ajax(request):
    if request.is_ajax():
        postInput = request.POST.get('postInput')
        # SCRAPE FOR LINK META CONTENT
        # https://www.geeksforgeeks.org/implementing-web-scraping-python-beautiful-soup/
        r = requests.get(postInput)
        soup = BeautifulSoup(r.content, 'html5lib')
        title = soup.find("meta", property="og:title")
        url = soup.find("meta", property="og:url")
        image = soup.find("meta", property="og:image")
        description = soup.find("meta", property="og:description")
        # (END) SCRAPE FOR LINK META CONTENT
        # Clean the URL - i.e. remove everything after but skip the // (.co.uk) (.com) (.net) (.org)
        original_meta_url = url["content"]
        cleaned_url = url["content"]  # Can remove this, it's just a failsafe
        strip_character = "/"
        cleaned_url = strip_character.join(
            original_meta_url.split(strip_character)[:3])
        data = []
        item = {
            'id': random.random(),
            'meta_image': image["content"],
            'meta_title': title["content"],
            'meta_description': description["content"],
            'cleaned_meta_url': cleaned_url,
            'full_meta_url': original_meta_url
        }
        data.append(item)
    return JsonResponse({'data': data})

# ##################### Feed Posts AJAX (takes arg for what page it's for, main/profile feed) #####################


@login_required(login_url='login')
def feed_posts_ajax(request, num_posts, feed_type, user_profile_id, post_detail_id):
    if request.is_ajax():
        # Get filter url params
        user_profile_id = user_profile_id
        post_detail_id = post_detail_id
        feedType = feed_type
        # Get "load more" params
        visible = 4
        upper = num_posts  # must assign string parameter to new variable name
        lower = upper - visible
        # Filter the data by feed_type
        if feedType == 'main-feed':  # Get all posts
            all_posts = SocialPost.objects.all().order_by('-created')
            all_polls = Poll.objects.all().order_by('-created')
            all_events = CalendarEvent.objects.all().order_by('-created')
        elif feedType == 'profile-feed':  # Get users feed
            # current_user_id = user_profile_id
            current_user = User.objects.get(id=user_profile_id)
            all_posts = SocialPost.objects.filter(
                author=current_user).order_by('-created')
            all_polls = Poll.objects.filter(
                author=current_user).order_by('-created')
            all_events = CalendarEvent.objects.filter(
                author=current_user).order_by('-created')
        elif feedType == 'detail-feed':  # Get single post
            all_posts = []
            post = SocialPost.objects.get(id=post_detail_id)
            # Add the single post to a list so it is iterable for below loop
            all_posts.append(post)
            all_polls = ''  # This variable is set so the below loop doesn't break
            all_events = ''  # This variable is set so the below loop doesn't break
        data = []
        size = 0
        # ADD ALL POSTS TO "DATA"
        for obj in all_posts:
            # SEE IF THEY HAD (ANY) REACTIONS FOR THE LIKE BUTTON HIGHLIGHT COLOR
            any_reaction = False
            if request.user in obj.like_reaction.all():
                any_reaction = True
            elif request.user in obj.love_reaction.all():
                any_reaction = True
            elif request.user in obj.care_reaction.all():
                any_reaction = True
            elif request.user in obj.laugh_reaction.all():
                any_reaction = True
            elif request.user in obj.wow_reaction.all():
                any_reaction = True
            elif request.user in obj.sad_reaction.all():
                any_reaction = True
            elif request.user in obj.angry_reaction.all():
                any_reaction = True
            else:
                pass
            # comment count
            if obj.comment_count == 1:
                comment_count = str(obj.comment_count) + ' Comment'
            elif obj.comment_count > 1:
                comment_count = str(obj.comment_count) + ' Comments'
            else:
                comment_count = 'No comments'
            # post images
            images = []
            for img in obj.post_images:
                images.append(str(img.post_photo))
            size += 1
            time_since_posted = convertTimeSincePosted(obj.created)
            reaction_count = obj.all_reactions_count
            if reaction_count == 0:
                reaction_count = 'No Reactions Yet'
            elif reaction_count == 1:
                reaction_count = str(reaction_count) + ' Reaction'
            else:
                reaction_count = str(reaction_count) + ' Reactions'
            item = {
                'id': obj.id,
                'post_type': 'post',
                'created': obj.created,
                'images': images,
                'post_body': obj.post_body,
                'reaction_count': reaction_count,
                'any_reaction': any_reaction,
                'like': True if request.user in obj.like_reaction.all() else False,
                'love': True if request.user in obj.love_reaction.all() else False,
                'care': True if request.user in obj.care_reaction.all() else False,
                'laugh': True if request.user in obj.laugh_reaction.all() else False,
                'wow': True if request.user in obj.wow_reaction.all() else False,
                'sad': True if request.user in obj.sad_reaction.all() else False,
                'angry': True if request.user in obj.angry_reaction.all() else False,
                'time_since_posted': time_since_posted,
                'user_handle': obj.author.handle,
                'comment_count': comment_count,
                'profile_photo': str(obj.author.profile_photo),
            }
            data.append(item)

        # ADD ALL POLLS TO "DATA"
        for obj in all_polls:
            # poll choices
            poll_choices = []
            for choice in PollChoice.objects.filter(poll=obj).order_by('id'):
                poll_choices.append(choice.choice)
            size += 1
            time_since_posted = convertTimeSincePosted(obj.created)
            item = {
                'id': obj.id,
                'post_type': 'poll',
                'created': obj.created,
                'poll_author_id': obj.author.id,
                'profile_photo': str(obj.author.profile_photo),
                'poll_author_handle': obj.author.handle,
                'poll_question': obj.question,
                'poll_choices': poll_choices,
                'time_since_posted': time_since_posted,
            }
            data.append(item)

        # ADD ALL EVENTS TO "DATA"
        for obj in all_events:
            time_since_posted = convertTimeSincePosted(obj.created)
            size += 1
            item = {
                'id': obj.id,
                'post_type': 'event',
                'created': obj.created,
                'event_author_id': obj.author.id,
                'profile_photo': str(obj.author.profile_photo),
                'event_author_handle': obj.author.handle,
                'title': obj.title,
                'notes': obj.notes,
                'time_since_posted': time_since_posted,
                'event_starts': obj.start.strftime("%m/%d/%Y, %I:%M %p"),
                'event_ends': obj.end.strftime("%m/%d/%Y, %I:%M %p"),
                'event_type': obj.event_type
            }
            data.append(item)

            # SORTS LIST (as we want it) IN REVERSE, even though reverse = True
            data.sort(reverse=True, key=lambda element: element['created'])
        return JsonResponse({'data': data[lower:upper], 'size': size})


@login_required(login_url='login')
def react_unreact_post_ajax(request, reaction_type):
    if request.is_ajax():
        pk = request.POST.get('pk')
        obj = SocialPost.objects.get(id=pk)
        # Check Reaction Type
        like = ''
        love = ''
        care = ''
        laugh = ''
        wow = ''
        sad = ''
        angry = ''
        if reaction_type == 'like':
            if request.user in obj.like_reaction.all():
                like = False
                obj.like_reaction.remove(request.user)
            else:
                like = True
                obj.like_reaction.add(request.user)
        elif reaction_type == 'love':
            if request.user in obj.love_reaction.all():
                love = False
                obj.love_reaction.remove(request.user)
            else:
                love = True
                obj.love_reaction.add(request.user)
        elif reaction_type == 'care':
            if request.user in obj.care_reaction.all():
                care = False
                obj.care_reaction.remove(request.user)
            else:
                care = True
                obj.care_reaction.add(request.user)
        elif reaction_type == 'laugh':
            if request.user in obj.laugh_reaction.all():
                laugh = False
                obj.laugh_reaction.remove(request.user)
            else:
                laugh = True
                obj.laugh_reaction.add(request.user)
        elif reaction_type == 'wow':
            if request.user in obj.wow_reaction.all():
                wow = False
                obj.wow_reaction.remove(request.user)
            else:
                wow = True
                obj.wow_reaction.add(request.user)
        elif reaction_type == 'sad':
            if request.user in obj.sad_reaction.all():
                sad = False
                obj.sad_reaction.remove(request.user)
            else:
                sad = True
                obj.sad_reaction.add(request.user)
        elif reaction_type == 'angry':
            if request.user in obj.angry_reaction.all():
                angry = False
                obj.angry_reaction.remove(request.user)
            else:
                angry = True
                obj.angry_reaction.add(request.user)
        else:
            pass
        # End Check Reaction Type
        reaction_count = obj.all_reactions_count
        if reaction_count == 1:
            reaction_count = str(reaction_count) + ' Reaction'
        else:
            reaction_count = str(reaction_count) + ' Reactions'
        return JsonResponse(
            {'like': like,
             'love': love,
             'care': care,
             'laugh': laugh,
             'wow': wow,
             'sad': sad,
             'angry': angry,
             'count': obj.like_reaction_count,
             'id': obj.id,
             'reaction_count': reaction_count,
             })


@login_required(login_url='login')
def create_comment_ajax(request):
    pk = request.POST.get('pk')
    comment_content = request.POST.get('commentContent')
    post = SocialPost.objects.get(id=pk)
    new_comment = SocialPostComment.objects.create(
        author=request.user,
        post=post,
        comment=comment_content,
    )
    # If you comment on your own post, don't create a notification
    if request.user == post.author:
        pass
    else:
        createNotification(post.author, new_comment, 'Comment')
    data = []  # Return empty list, never used
    return JsonResponse({'data': data})


@login_required(login_url='login')
def get_comments_ajax(request):
    comments = SocialPostComment.objects.all().order_by('-id')
    data = []
    for obj in comments:
        # True/False if current user is author, to show edit/delete options
        if obj.author.id == request.user.id:
            user_is_author = True
        else:
            user_is_author = False
        time_since_posted = convertTimeSincePosted(obj.created)
        item = {
            'id': obj.id,
            'post_id': obj.post.id,
            'user_is_author': user_is_author,
            'handle': obj.author.handle,
            'comment': obj.comment,
            'time_since_posted': time_since_posted,
            'name': obj.author.handle,
            'profile_photo': str(obj.author.profile_photo),
        }
        data.append(item)
    return JsonResponse({'data': data})


@login_required(login_url='login')
def get_comment_count_ajax(request):
    if request.is_ajax():
        pk = request.POST.get('pk')
        post = SocialPost.objects.get(id=pk)
        comment_count = post.comment_count
        # comment count filter
        if comment_count == 1:
            comment_count = str(comment_count) + ' Comment'
        elif comment_count > 1:
            comment_count = str(comment_count) + ' Comments'
        else:
            comment_count = 'No comments'
        return JsonResponse({'comment_count': comment_count})


@login_required(login_url='login')
def delete_comment_ajax(request):
    if request.is_ajax():
        comment_id = request.POST['pk']
        comment_id = int(comment_id)
        comment = SocialPostComment.objects.get(id=comment_id)
        comment.delete()
        # return the id of the post so we can pass it to comment count function
        return JsonResponse({'post_id': comment.post.id})


@ensure_csrf_cookie
def create_post_ajax(request):
    if request.method == 'POST':
        files = request.FILES.getlist('files[]', None)
        post_body = request.POST.get('createPostInput')
        if request.POST.get('urlMetadataPreview'):
            url_metadata_preview = request.POST.get('urlMetadataPreview')
            post_body = post_body + '<br>' + url_metadata_preview
        new_post = SocialPost.objects.create(
            author=request.user,
            post_body=post_body,
        )
        for f in files:
            SocialPostImage.objects.create(
                post=new_post,
                post_photo=f,
            )
        data = []  # Return empty list, never used
        return JsonResponse({'data': data})


"""###############################################################
        ##################### PROFILE #####################
###############################################################"""


@login_required(login_url='login')
def user_profile(request, pk):
    current_users_profile = False
    if request.user.id == pk:
        current_users_profile = True
    current_user = User.objects.get(id=pk)
    context = {
        'current_users_profile': current_users_profile,
        'current_user': current_user,
    }
    return render(request, 'theapp/profile/profile.html', context)


@login_required(login_url='login')
def friend_list(request):
    context = {}
    return render(request, 'theapp/profile/friend-list.html', context)


@login_required(login_url='login')
def users(request):
    return render(request, 'theapp/profile/users.html', {})


@login_required(login_url='login')
def users_ajax(request):
    if request.is_ajax():
        # Don't return your own user object
        all_users = User.objects.filter(~Q(id=request.user.id))
        data = []
        for user in all_users:
            request_pending = False
            for notification in user.get_pending_friend_requests():
                if notification.pending_friend_request == request.user:
                    request_pending = True
            item = {
                'user_header_photo': str(user.header_photo),
                'user_profile_photo': str(user.profile_photo),
                'user_id': user.id,
                'user_handle': user.handle,
                'user_country': user.country,
                'user_bio': user.bio[:15],
                'already_friends': True if user in request.user.get_friends() else False,
                'request_pending': request_pending,
            }
            data.append(item)
        return JsonResponse({'data': data})


@login_required(login_url='login')
def send_friend_request_ajax(request):
    if request.is_ajax():
        user_id = request.POST.get('user_id')
        user_requesting = request.user
        user_recipient = User.objects.get(id=user_id)
        for req in user_recipient.get_pending_friend_requests():
            if req.pending_friend_request == user_requesting:
                alert = 'You can\'t send two friend requests to ' + user_recipient.handle + '!'
                return JsonResponse({'alert': alert})
        createNotification(user_recipient, user_requesting,
                           'Pending Friend Request')
        alert = 'You just sent a friend request to ' + user_recipient.handle + '!'
        return JsonResponse({'alert': alert})


@login_required(login_url='login')
def friend_request_pending_ajax(request):
    if request.is_ajax():
        user_id = request.POST.get('user_id')
        user_requesting = request.user
        user_recipient = User.objects.get(id=user_id)
        recipient_notifications = Notification.objects.filter(
            user=user_recipient)
        request_is_pending = False
        for notification in recipient_notifications:
            if user_requesting == notification.pending_friend_request:
                request_is_pending = True
        return JsonResponse({'request_is_pending': request_is_pending})


@login_required(login_url='login')
def get_profile_photos_ajax(request):
    if request.is_ajax():
        user_id = request.POST.get('user_id')
        location = request.POST.get('location')
        current_user = User.objects.get(id=user_id)
        user_posts = SocialPost.objects.filter(author=current_user)
        photos = []
        for post in user_posts:
            for photo in post.socialpostimage_set.all():
                item = {
                    'photo': str(photo.post_photo),
                    'post_id': photo.post.id,
                }
                if location == 'Sidebar':
                    if len([i for i in photos if i]) < 9:  # Max is nine for sidebar
                        photos.append(item)
                else:
                    photos.append(item)
        return JsonResponse({'photos': photos})


@login_required(login_url='login')
def unfriend_user(request, pk):
    # remove me from their friends list
    user = User.objects.get(id=pk)
    user.friends.remove(request.user)
    # remove from my friends list
    request.user.friends.remove(user)
    alert = 'You just unfriended ' + user.handle
    context = {
        'alert': alert,
    }
    return render(request, 'theapp/profile/friend-list.html', context)
    # return redirect('user-profile', kwargs=user.id)


@login_required(login_url='login')
def delete_friend_request(request, pk):
    notification = Notification.objects.get(id=pk)
    notification.delete()
    # Create a rejected friend request notification
    createNotification(notification.rejected_friend_request,
                       notification.user, 'Rejected Friend Request')
    return redirect('my-feed')  # Update to return to current page


@login_required(login_url='login')
def confirm_friend_request(request, pk):
    notification = Notification.objects.get(id=pk)
    notification_sender = notification.pending_friend_request
    notification_recipient = request.user
    # Add the friends
    notification_sender.friends.add(notification_recipient)
    notification_recipient.friends.add(notification_sender)
    # Delete the notification/friend request stand-in object
    notification.delete()
    # Create an accepted friend request notification
    createNotification(notification_sender,
                       notification_recipient, 'Accepted Friend Request')
    context = {}
    return render(request, 'theapp/profile/friend-list.html', context)


@login_required(login_url='login')
def birthdays(request):
    context = {}
    return render(request, 'theapp/profile/birthdays.html', context)


@login_required(login_url='login')
def get_all_birthdays_ajax(request):
    birthdays = []
    this_month = datetime.now(timezone.utc).strftime("%B")
    friend_list = request.user.get_friends().order_by('birth_day')
    for friend in friend_list:
        friend_birth_day_month = friend.birth_day.strftime("%B")
        days_until_birthday = getDaysUntilBirthday(friend.birth_day)
        if ":" in days_until_birthday:
            days_until_birthday = 'Today'
        elif int(days_until_birthday) == 1:
            days_until_birthday = 'In ' + days_until_birthday + ' Day'
        elif int(days_until_birthday) == 30:
            days_until_birthday = 'In One Month'
        elif int(days_until_birthday) < 30:
            days_until_birthday = 'In ' + days_until_birthday + ' Days'
        else:
            days_until_birthday = friend.birth_day.strftime("%b %d, %Y")

        item = {
            'friend_id': friend.id,
            'birthday_is': days_until_birthday,
            'friend_handle': friend.handle,
            'profile_photo': str(friend.profile_photo),
            'birthday_month': friend_birth_day_month,  # For categorizing
        }
        birthdays.append(item)
    # Send all months of this user's friends birthdays to the front end for categorization
    birthday_months = []
    for birthday in birthdays:
        month = birthday.get("birthday_month")
        if not any(m['month'] == month for m in birthday_months):
            item = {
                'month': month,
                'this_month': True if this_month == month else False,
            }
            birthday_months.append(item)
    return JsonResponse({'birthdays': birthdays, 'birthday_months': birthday_months, 'this_month': this_month})


@login_required(login_url='login')
def profile_header_photo_ajax(request):
    if request.is_ajax():
        current_user_id = request.POST.get('current_user_id')
        current_user = User.objects.get(id=current_user_id)
        header_photo = str(current_user.header_photo)
        return JsonResponse({'data': header_photo})


@ensure_csrf_cookie
def update_header_photo_ajax(request):
    if request.method == 'POST':
        current_user_id = request.POST.get('current_user_id')
        current_user = User.objects.get(id=current_user_id)
        if request.user == current_user:
            new_header_photo = request.FILES.get('header-photo-file', None)
            current_user = request.user
            current_user.header_photo = new_header_photo
            current_user.save()
            data = []  # Return empty list, never used
            return JsonResponse({'data': data})


@login_required(login_url='login')
def get_my_friend_list_ajax(request):
    if request.is_ajax():
        chat_search_input = ''
        if request.POST.get('chat_search_input'):
            chat_search_input = request.POST.get('chat_search_input')
        if request.POST.get('current_user_id'):
            current_user_id = request.POST.get('current_user_id')
        else:
            current_user_id = request.user.id
        current_user = User.objects.get(id=current_user_id)
        friend_list = current_user.get_friends()
        data = []
        searched_data = []
        for friend in friend_list:
            friend_count = ''
            friend_count_number = friend.get_friends_count()
            if friend_count_number < 2:
                friend_count = str(friend_count_number) + ' friend'
            else:
                friend_count = str(friend_count_number) + ' friends'

            following = False
            if friend in current_user.get_im_following():
                following = True
            item = {
                'friend_handle': friend.handle,
                'friend_profile_photo': str(friend.profile_photo),
                'friend_header_photo': str(friend.header_photo),
                'friend_bio': friend.bio,
                'friend_country': friend.country,
                'friend_following': following,
                'friend_count': friend_count,
                'friend_id': friend.id,
            }
            data.append(item)
            if chat_search_input:
                if friend.handle.lower() == chat_search_input.lower():
                    searched_data.append(item)
        return JsonResponse({'data': data, 'searched_data': searched_data})


"""###############################################################
        ##################### MESSAGES #####################
###############################################################"""


@login_required(login_url='login')
def messages(request):
    return render(request, 'theapp/messages/messages.html', {})


@login_required(login_url='login')
def message_thread(request, pk):
    return render(request, 'theapp/messages/message-thread.html', {})


@login_required(login_url='login')
def get_messages_ajax(request, friend_id):
    if request.is_ajax():
        friendId = friend_id
        friend = User.objects.get(id=friendId)
        deleteNotification(request, friend, 'Message')
        messages = []
        freind_sent_messages = DirectMessage.objects.filter(sender=friend)
        freind_recieved_messages = DirectMessage.objects.filter(
            recipient=friend)
        for m in freind_sent_messages:
            messages.append(m)
        for m in freind_recieved_messages:
            messages.append(m)
        data = []
        for m in messages:
            if m.sender == request.user:
                # Current users messages
                item = {
                    'messageBody': m.message_body,
                    'myMessage': True,
                    'created': m.created,
                    'profile_photo': str(request.user.profile_photo),
                    # 'created': m.created.strftime("%b %d, %Y <br> %I:%M %p"),
                    'created': m.created.strftime("%I:%M %p"),
                }
                data.append(item)
            else:
                # Chatting with user messages
                item = {
                    'messageBody': m.message_body,
                    'myMessage': False,
                    'created': m.created,
                    'profile_photo': str(m.sender.profile_photo),
                    # 'created': m.created.strftime("%b %d, %Y <br> %I:%M %p"),
                    'created': m.created.strftime("%I:%M %p"),
                }
                data.append(item)
        data.sort(reverse=False, key=lambda element: element['created'])
        # Add info about who you are chatting with
        friend_info = []
        item = {
            'friend_profile_photo': str(friend.profile_photo),
            'friend_handle': friend.handle,
            'friend_country': friend.country,
        }
        friend_info.append(item)
        return JsonResponse({'data': data, 'friend_info': friend_info})


@login_required(login_url='login')
def create_message_ajax(request):
    if request.is_ajax():
        message_body = request.POST.get('message')
        recipient_id = request.POST.get('recipient_id')
        recipient = User.objects.get(id=recipient_id)
        new_message = DirectMessage.objects.create(
            sender=request.user,
            recipient=recipient,
            message_body=message_body,
        )
        createNotification(recipient, new_message, 'Message')
        data = []
        item = {  # Only sending back messages that this user creates
            'messageBody': new_message.message_body,
            'myMessage': True,
            'created': new_message.created,
            'profile_photo': str(request.user.profile_photo),
            'created': new_message.created.strftime("%I:%M %p"),
        }
        data.append(item)
        return JsonResponse({'data': data})

# Check for / get new messages every ten seconds


@login_required(login_url='login')
def get_new_message_ajax(request):
    if request.is_ajax():
        friend_id = request.POST.get('recipient_id')
        friend = User.objects.get(id=friend_id)
        deleteNotification(request, friend, 'Message')
        messages = []
        freind_sent_messages = DirectMessage.objects.filter(sender=friend)
        for m in freind_sent_messages:
            messages.append(m)
        data = []
        for m in messages:
            # Check if this message was made in the last ten seconds
            date1 = datetime.now(timezone.utc)
            date2 = m.created
            elapsed_time = date2 - date1
            elapsed_time = elapsed_time.total_seconds()
            sep = '.'
            elapsed_time = str(elapsed_time).split(sep, 1)[0]
            elapsed_time = elapsed_time.replace('-', '')

            if int(elapsed_time) <= 3:
                item = {  # Only sending back messages that the friend/user creates
                    'messageBody': m.message_body,
                    'myMessage': False,
                    'created': m.created,
                    'profile_photo': str(m.sender.profile_photo),
                    'created': m.created.strftime("%I:%M %p"),
                }
                data.append(item)
        data.sort(reverse=False, key=lambda element: element['created'])
        return JsonResponse({'data': data})


"""###############################################################
        ##################### EVENTS #####################
###############################################################"""


@login_required(login_url='login')
def events(request):
    context = {}
    return render(request, 'theapp/events/events.html', context)


@login_required(login_url='login')
def profile_event(request):
    context = {}
    return render(request, 'theapp/events/profile-event.html', context)


def all_events(request):
    all_events = CalendarEvent.objects.filter(author=request.user)
    data = []
    for event in all_events:
        data.append({
            'title': event.title,
            'id': event.id,
            'start': event.start.strftime("%m/%d/%Y, %H:%M:%S"),
            'end': event.end.strftime("%m/%d/%Y, %H:%M:%S"),
            'event_type': event.event_type,
            'notes': event.notes,
        })
    return JsonResponse(data, safe=False)


def add_event(request):
    start_date = request.POST.get("start-date", None)
    start_time = request.POST.get("start-time", None)
    end_date = request.POST.get("end-date", None)
    end_time = request.POST.get("end-time", None)
    start = start_date + 'T' + start_time
    end = end_date + 'T' + end_time
    event_type = request.POST.get("newEventType", None)
    title = request.POST.get("title", None)
    if request.POST.get("notes", None):  # notes is an optional field
        notes = request.POST.get("notes", None)
    else:
        notes = ''
    CalendarEvent.objects.create(
        title=title, notes=notes, start=start, end=end, author=request.user, event_type=event_type)
    data = {}
    return JsonResponse(data)


def update_event(request):
    event_type = request.POST.get("eventTypeUpdate", None)
    title = request.POST.get("eventNameUpdate", None)
    start_date = request.POST.get("start-date", None)
    start_time = request.POST.get("start-time", None)
    end_date = request.POST.get("end-date", None)
    end_time = request.POST.get("end-time", None)
    start = start_date + 'T' + start_time
    end = end_date + 'T' + end_time
    notes = request.POST.get("notesUpdate", None)
    id = request.POST.get("id", None)
    event = CalendarEvent.objects.get(id=id)
    event.event_type = event_type
    event.notes = notes
    event.start = start
    event.end = end
    event.title = title
    event.save()
    data = {'event': event.event_type}
    return JsonResponse(data)


def remove_event(request):
    id = request.GET.get("id", None)
    event = CalendarEvent.objects.get(id=id)
    event.delete()
    data = {}
    return JsonResponse(data)


"""###############################################################
        ##################### POLLS #####################
###############################################################"""


@login_required(login_url='login')
def delete_poll(request, pk):
    poll_to_delete = Poll.objects.get(id=pk)
    poll_to_delete.delete()
    return redirect('my-polls')


@login_required(login_url='login')
def create_poll(request):
    poll_question = request.POST['poll_question']
    poll_choices = request.POST.getlist('poll_choices')
    new_poll = Poll.objects.create(
        author=request.user,
        question=poll_question,
    )
    for choice in poll_choices:
        PollChoice.objects.create(choice=choice, poll=new_poll)
    polls = Poll.objects.filter(author=request.user).order_by('-id')
    context = {
        'polls': polls,
    }
    return render(request, 'theapp/polls/my-polls.html', context)


@login_required(login_url='login')
def my_polls(request):
    polls = Poll.objects.filter(author=request.user).order_by('-id')
    context = {
        'polls': polls,
    }
    return render(request, 'theapp/polls/my-polls.html', context)


@login_required(login_url='login')
def poll(request, pk):
    poll = Poll.objects.get(id=pk)
    poll_choices = PollChoice.objects.filter(poll=poll).order_by('id')
    context = {
        'poll': poll,
        'poll_choices': poll_choices,
    }
    return render(request, 'theapp/polls/poll.html', context)


@login_required(login_url='login')
def save_poll_entry_ajax(request):
    if request.is_ajax():
        poll_response_list = request.POST.getlist('poll_response')
        poll_id = request.POST.get('poll_id')
        poll = Poll.objects.get(id=poll_id)
        for choice in poll.get_poll_choices():
            for response in poll_response_list:  # only gets selected choice
                if response == choice.choice:  # if posted choice/response is same as this choice.choice add 1 to choice count of that choice
                    # += 1 on "choice_count" field
                    choice.choice_count += 1
                    # Add this user to the "participants" field if not already in the list (notify when poll ends)
                    if request.user in choice.participants.all():
                        pass
                    else:
                        choice.participants.add(request.user)
                    choice.save()
        data = []  # Return empty list, never used
        return JsonResponse({'data': data})

# Just the page, see below


@login_required(login_url='login')
def poll_results(request, pk):
    poll = Poll.objects.get(id=pk)
    return render(request, 'theapp/polls/poll-results.html', {'poll': poll, })

# This is only for the user to see results after submiting their poll response


@login_required(login_url='login')
def poll_results_ajax(request):
    if request.is_ajax():
        poll_id = request.POST.get('poll_id')
        this_poll = Poll.objects.get(id=poll_id)
        this_poll_choices = this_poll.get_poll_choices()  # EACH CHOICE
        all_votes = 0  # ALL ANSWERS TO ALL CHOICES
        for choice in this_poll_choices:
            all_votes += choice.choice_count
        poll_results = []
        for choice in this_poll_choices:
            # Determine if this user selected this "Choice"
            user_selected = False
            if request.user in choice.participants.all():
                user_selected = True
            try:  # If no users have submit a poll response this will break, so set the default choice_percent to "0"
                choice_percent = choice.choice_count / all_votes
                choice_percent = choice_percent * 100
            except:
                choice_percent = 0
            item = {
                'user_selected': user_selected,
                'choice_text': choice.choice,
                'choice_percent': int(choice_percent),
            }
            poll_results.append(item)

        return JsonResponse({'poll_results': poll_results, 'all_votes': all_votes})


"""###############################################################
        ##################### ERRORS #####################
###############################################################"""


def custom_error_404(request, exception):
    return render(request, 'theapp/error.html', {'exception': exception, })


def custom_error_500(request):
    return render(request, 'theapp/error.html', {})


def custom_error_403(request, exception):
    return render(request, 'theapp/error.html', {'exception': exception, })
