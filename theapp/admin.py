from django.contrib import admin
from .models import *
# Posts
admin.site.register(SocialPost)
admin.site.register(SocialPostImage)
admin.site.register(SocialPostComment)
admin.site.register(DirectMessage)
admin.site.register(Notification)
# Polls
admin.site.register(Poll)
admin.site.register(PollChoice)
# Calendar
admin.site.register(CalendarEvent)
