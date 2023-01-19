from django.db import models
from django.conf import settings
from ckeditor.fields import RichTextField
from django.urls import NoReverseMatch


class SocialPost(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    # LIKE TYPES
    like_reaction = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="liked", blank=True)
    love_reaction = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="loved", blank=True)
    care_reaction = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="cared", blank=True)
    laugh_reaction = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="laughed", blank=True)
    wow_reaction = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="wowed", blank=True)
    sad_reaction = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="saddened", blank=True)
    angry_reaction = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="angered", blank=True)
    # END LIKE TYPES
    post_body = RichTextField()
    post_date = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    @property
    def comment_count(self):
        return self.socialpostcomment_set.all().count()

    @property
    def get_comments(self):
        return self.socialpostcomment_set.all()

    @property
    def post_images(self):
        return self.socialpostimage_set.all()

    @property
    def all_reactions_count(self):
        reaction_count = 0
        reaction_count += self.like_reaction.all().count()
        reaction_count += self.love_reaction.all().count()
        reaction_count += self.care_reaction.all().count()
        reaction_count += self.laugh_reaction.all().count()
        reaction_count += self.wow_reaction.all().count()
        reaction_count += self.sad_reaction.all().count()
        reaction_count += self.angry_reaction.all().count()
        return reaction_count

    @property
    def like_reaction_count(self):
        return self.like_reaction.all().count()

    @property
    def love_reaction_count(self):
        return self.love_reaction.all().count()

    @property
    def care_reaction_count(self):
        return self.care_reaction.all().count()

    @property
    def laugh_reaction_count(self):
        return self.laugh_reaction.all().count()

    @property
    def wow_reaction_count(self):
        return self.wow_reaction.all().count()

    @property
    def sad_reaction_count(self):
        return self.sad_reaction.all().count()

    @property
    def angry_reaction_count(self):
        return self.angry_reaction.all().count()

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return self.author.handle


class SocialPostImage(models.Model):
    post = models.ForeignKey(SocialPost, on_delete=models.CASCADE, null=True)
    post_photo = models.ImageField(
        upload_to='post-images')  # many photos for a post

    @property
    def imageURL(self):
        try:
            url = self.photo.url
        except:
            url = ''
        return url


class SocialPostComment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="myComment", on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(SocialPost, on_delete=models.CASCADE, null=True)
    comment = models.CharField(max_length=1000, null=True, blank=True)
    comment_photo = models.ImageField()  # 1 comment/1 photo
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    @property
    def imageURL(self):
        try:
            url = self.photo.url
        except:
            url = ''
        return url

    def __str__(self):
        return self.post.author.handle

############################################ MESSAGES ############################################


class DirectMessage(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="message_sender", on_delete=models.CASCADE)
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="message_recipient", on_delete=models.CASCADE)
    message_body = RichTextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated', '-created']

    def save(self, *args, **kwargs):
        if self.sender == self.recipient:
            raise NoReverseMatch()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.sender} {self.recipient}'

############################################ POLLS ############################################


class Poll(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="myPoll",  on_delete=models.CASCADE, null=True)
    question = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    # poll_ends = models.DateTimeField(auto_now_add=False)

    def get_poll_choices(self):
        choices = list(self.pollchoice_set.all())
        return choices
        # call this poll.get_poll_choices.choice (or) choice_count

    def __str__(self):
        return self.question


class PollChoice(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    choice = models.CharField(max_length=30)
    choice_count = models.IntegerField(default=0)
    participants = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="pollParticipants")

    @property
    def get_participants(self):
        participants = self.participants.all()
        participants_list = []
        for participant in participants:
            participants_list.append(participant)
        return participants_list

    # When a user completes the poll, choice_count += 1, and that user is added to the "participants"
    # .. list to get notified of results when the poll ends

    def __str__(self):
        return self.choice


############################################ EVENTS ############################################

CHOICES = (
    ('Virtual', 'Virtual'),
    ('In Person', 'In Person'),
)


class CalendarEvent(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="myEvent",  on_delete=models.CASCADE, null=True)
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    # add notes, urls, (later add attachments)
    notes = models.CharField(max_length=255, null=True, blank=True)
    start = models.DateTimeField(null=True, blank=True)
    end = models.DateTimeField(null=True, blank=True)
    event_type = models.CharField(
        choices=CHOICES, max_length=255, default="Virtual")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

############################################ NOTIFICATIONS ############################################


class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, null=True)
    read = models.BooleanField(default=False)
    message = models.ForeignKey(
        DirectMessage, blank=True, on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(
        SocialPostComment, blank=True, on_delete=models.CASCADE, null=True)
    pending_friend_request = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="pendingFriendRequestNotification", blank=True, on_delete=models.CASCADE, null=True)
    accepted_friend_request = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="acceptedFriendRequestNotification", blank=True, on_delete=models.CASCADE, null=True)
    rejected_friend_request = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="rejectedFriendRequestNotification", blank=True, on_delete=models.CASCADE, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user.handle)
