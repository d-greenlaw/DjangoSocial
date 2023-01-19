from datetime import timezone
from datetime import datetime
from .models import *

"""###############################################################
        ##################### UTILITY FUNCTIONS #####################
###############################################################"""


def convertTimeSincePosted(created):
    date1 = datetime.now(timezone.utc)
    date2 = created
    timedelta = date2 - date1
    sep = ','
    time_since_posted = str(timedelta).split(sep, 1)[0]
    # "time_since_posted" currently will say: either -1 day or -X days
    # It should say "Posted Today" if "-1 day"
    # ..Otherwise remove the "-" and "days" and instead make it say "Posted 4 Days Ago"
    if time_since_posted == '-1 day':
        time_since_posted = 'Posted Today'
    else:
        time_since_posted = time_since_posted.replace('-', '')
        removal_list = ["days"]
        edit_time_since_posted = time_since_posted.split()
        final_list = [
            word for word in edit_time_since_posted if word not in removal_list]
        time_since_posted = ' '.join(final_list)
        time_since_posted = 'Posted ' + time_since_posted + ' Days Ago'
    return time_since_posted


def getDaysUntilBirthday(birthday):
    date1 = datetime.now(timezone.utc)
    date2 = birthday
    elapsed_time = date2 - date1
    # Clean up the strings
    sep = ','
    elapsed_time = str(elapsed_time).split(sep, 1)[0]
    elapsed_time = elapsed_time.replace('-', '')
    elapsed_time = elapsed_time.replace('days', '')
    elapsed_time = elapsed_time.replace('day', '')
    return elapsed_time


def mutualFriendCount(user, friend_list):
    mutual_friend_count = 0
    for my_friend in friend_list:  # Current users friends
        for mutual_friend in user.get_friends():
            if my_friend == mutual_friend:
                mutual_friend_count += 1
    return mutual_friend_count


def createNotification(the_user, the_object, object_type):
    try:
        if object_type == 'Message':
            Notification.objects.create(
                user=the_user,
                message=the_object,
            )
        if object_type == 'Comment':
            Notification.objects.create(
                user=the_user,
                comment=the_object,
            )
        if object_type == 'Pending Friend Request':
            Notification.objects.create(
                user=the_user,
                pending_friend_request=the_object,
            )
        if object_type == 'Accepted Friend Request':
            Notification.objects.create(
                user=the_user,
                accepted_friend_request=the_object,
            )
        if object_type == 'Rejected Friend Request':
            Notification.objects.create(
                user=the_user,
                rejected_friend_request=the_object,
            )
        return 'Created'
    except:
        return 'Failed'  # Todo: handle this exception


def deleteNotification(request, friend, notification_type):
    try:
        if notification_type == 'Message':
            msg_notif = request.user.get_unread_notifications()
            msg_notif = msg_notif.get("unread_message_notifications")
            for notification in msg_notif:
                if notification.message.sender == friend:
                    notification.delete()
        return 'Deleted Successfully'
    except:
        return 'Failed'
