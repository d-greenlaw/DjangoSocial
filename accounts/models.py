from django.db.models import Q
from django.conf import settings
from audioop import reverse
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin


################################### CUSTOM USER MODEL ###################################
class CustomUserManager(BaseUserManager):
    
    def create_user(self, email, handle, birth_day, header_photo, bio, country, friends, following_me, im_following, profile_photo, password=None,):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            handle=handle,
            profile_photo=profile_photo,
            bio=bio,
            country=country,
            following_me=following_me,
            im_following=im_following,
            birth_day=birth_day, 
            header_photo=header_photo,
            friends=friends,
        )

        user.set_password(password)
        # Toggle if: superuser create broke from this stuff
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        # endToggle if: superuser broke
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    

class User(AbstractUser, PermissionsMixin):
    profile_photo = models.ImageField(default='profile-default.png', upload_to='profile-images')
    header_photo = models.ImageField(default='header-default.png', upload_to='header-images')
    handle = models.CharField(max_length=50, blank=False)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=200)
    bio = models.TextField(default="No bio yet!", max_length=300)
    country = models.CharField(max_length=200, blank=True)
    birth_day = models.DateTimeField(auto_now_add=False)
    # Who sees my posts
    following_me = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='followingMe')
    # Who's posts I see
    im_following = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='imFollowing')
    # My friends regardless of who sees who's posts
    friends = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='myFriends')
    created = models.DateTimeField(auto_now_add=True)

    def get_absolute_url(self):
        return reverse("profiles:user-profile", kwargs={"handle": self.handle})

    def get_pending_friend_requests(self):
        return self.notification_set.all()

    def get_following_me(self):
        return self.following_me.all()

    def get_following_me_count(self):
        return self.following_me.all().count()

    def get_im_following(self):
        return self.im_following.all()

    def get_im_following_count(self):
        return self.im_following.all().count()

    def get_friends(self):
        return self.friends.all()

    def get_friends_count(self):
        return self.friends.all().count()

    def get_posts_count(self):
        return self.socialpost_set.all().count()

    def get_likes_given_count(self):
        likes = self.like_set.all()
        total_liked = 0
        for item in likes:
            if item.value=='Like':
                total_liked += 1
        return total_liked

    def get_likes_recieved_count(self):
        posts = self.socialpost_set.all()
        total_liked = 0
        for item in posts:
            total_liked += item.liked.all().count()
        return total_liked

    def get_unread_notification_count(self):
        all_notifications = self.notification_set.all()

        # Set values
        unread_message_notification_count = 0
        unread_comment_notification_count = 0
        unread_friend_request_notification_count = 0
        unread_accepted_friend_request_notification_count = 0
        unread_rejected_friend_request_notification_count = 0

        for notification in all_notifications:
            # Gather unread message notifications, count them
            if notification.message:
                if notification.read == False:
                    unread_message_notification_count += 1

            # Gather unread comment notifications, count them
            if notification.comment:
                if notification.read == False:
                    unread_comment_notification_count += 1

            # Gather unread friend request notifications, count them
            if notification.pending_friend_request:
                if notification.read == False:
                    unread_friend_request_notification_count += 1

            # Gather unread accepted friend request notifications, count them
            if notification.accepted_friend_request:
                if notification.read == False:
                    unread_accepted_friend_request_notification_count += 1

            # Gather unread rejected friend request notifications, count them
            if notification.rejected_friend_request:
                if notification.read == False:
                    unread_rejected_friend_request_notification_count += 1

        data = {
            'unread_message_notification_count':unread_message_notification_count,
            'unread_comment_notification_count':unread_comment_notification_count,
            'unread_friend_request_notification_count':unread_friend_request_notification_count,
            'unread_accepted_friend_request_notification_count':unread_accepted_friend_request_notification_count,
            'unread_rejected_friend_request_notification_count':unread_rejected_friend_request_notification_count,
            }
        return data

    def get_unread_notifications(self):
        all_notifications = self.notification_set.all().order_by('-created')

        # Set values
        unread_message_notifications = []
        unread_comment_notifications = []
        unread_friend_request_notifications = []
        unread_accepted_friend_request_notifications = []
        unread_rejected_friend_request_notifications = []

        for notification in all_notifications:
            # Gather unread message notifications, add to list
            if notification.message:
                if notification.read == False:
                    unread_message_notifications.append(notification)

            # Gather unread comment notifications, add to list
            if notification.comment:
                if notification.read == False:
                    unread_comment_notifications.append(notification)

            # Gather unread friend request notifications, add to list
            if notification.pending_friend_request:
                if notification.read == False:
                    unread_friend_request_notifications.append(notification)

            # Gather unread accepted friend request notifications, add to list
            if notification.accepted_friend_request:
                if notification.read == False:
                    unread_accepted_friend_request_notifications.append(notification)

            # Gather unread rejected friend request notifications, add to list
            if notification.rejected_friend_request:
                if notification.read == False:
                    unread_rejected_friend_request_notifications.append(notification)

        # Add to a dict, call it data - why not?
        data = {
            'unread_message_notifications':unread_message_notifications,
            'unread_comment_notifications':unread_comment_notifications,
            'unread_friend_request_notifications':unread_friend_request_notifications,
            'unread_accepted_friend_request_notifications':unread_accepted_friend_request_notifications,
            'unread_rejected_friend_request_notifications':unread_rejected_friend_request_notifications,
            }
        return data


    def __str__(self):
        return self.user.handle
    
    username = None
    
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']
    
    objects = CustomUserManager()
    
    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return f'{self.handle} {self.email}'
