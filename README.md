<h1 align="center">
  <br>
  <img src="https://djangosocial-production.up.railway.app/static/images/logo.png" alt="Java Test" width="200">
  <br>
  Django Social | by Devon Greenlaw
  <br>
</h1>

<h4 align="center">A Web App Written Using the <a href="https://www.djangoproject.com/" target="_blank">Django Framework </a> and JavaScript.</h4>

<p align="center">
  <a href="#project-overview">Overview</a> •
  <a href="#posting-features">Posting</a> •
  <a href="#profile-features">Profile</a> •
  <a href="#live-chat-features">Live Chat</a> •
  <a href="#event-features">Events</a> •
  <a href="#poll-features">Polls</a> •
  <a href="#notification-features">Notifications</a> •
  <a href="#in-development">In Development</a>
</p>

## Project Overview

* Please browse the code for this project here on GitHub. It is my cornerstone project and displays my most current skills!

* Here you can watch a brief [Demo Video](https://drive.google.com/file/d/1yYO12gMOj4jM-2yUD2bBn8mQjP8FhEti/view?usp=sharing) of the project in action.

* You can also test the app on the [Live Server](https://djangosocial-production.up.railway.app/). Feel free to use the dummy accounts found on the login page, or make your own account.

To clone and run this application locally you'll need [Git](https://git-scm.com), and [Python](https://www.python.org/downloads/) installed. 

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/d-greenlaw/DjangoSocial.git

# Go into the repository
$ cd DjangoSocial

# Create a new virtual environment (optional)
$ python3 venv -env

# Activate your virtual environment
$ source env/bin/activate

# Install the project requirements
$ pip install -r requirements.txt

# Run the application
$ python3 manage.py runserver
```

## Posting Features
* Post a url (YouTube, website/blog post, etc.) and display meta data in the post.
* Remove preview of this metadata if you change your mind.
* Display preview, for multiple links.
* Listen after every "keystroke" for a "paste" of a URL, and check if url is valid.
* Save the link preview in the post as it looks in the preview.
* Post images, display appropriately in post, with upload preview.
* Show images in a post using a carousel.
* React to posts with various reaction types.
* Post GIFs, emojis, photos in bulk.
* View a post in it’s own page (post-details/postId).
* Embed a post (add url to working detail page).
* Copy link to a post.
* Repost a post.

## Profile Features

* Friend / un-friend a user.
* Manually approve friend requests.
* In sidebar, show suggested friends (friends of friends).
* In sidebar, show upcoming birthdays.
* In sidebar, show recent events.
* All birthdays page.
* All users page.
* My friends page.
* My profile/feed (if it’s your own feed you can post to it).
* User profile/feed.

## Live Chat Features

* Direct message your friends.
* Instantly see your messages, and responses.

## Event Features

* CRUD events.
* Post events in a month/calendar view.
* Show events in your feed, and your friend’s feed.

## Poll Features

* Create a Poll:
* In the “Create Post” area of your feed, or in the “My Polls” page, create a new poll.
* Type a poll question into the main compose box.
* Insert your first poll option into the first choice box, then click the “Add Choice”.button to add your additional poll options. 

* Vote in a poll:
* When you see a poll in a post, simply click or tap your preferred option. 
* The results are instantly displayed after you vote. 
* Your vote is indicated with a checkmark next to the choice, along with the total votes and the percentages.

## Notification Features

* Received a new message.
* Friend request recieved.
* Your post was commented on.

## In Development

* Profile Features:
* Add search to “users” and “friends” pages.
* Add upload images to profile image area.
* Delete message threads.
* Add notification for when a user’s friend request was rejected or accepted.
* Edit profile information.
* Groups (suggest ones friends are in, show friends).

* Posting Features:
* The URL metadata preview should update the “post button” color, as well as the image preview/upload.
* Convert times to the local users time with JS.
* Comment on and react to comments.
* The author of post, or comment author, can delete comment on posts.
* Post authors can delete posts.
* Create an event detail page.
* Users can comment or react to polls and events.
* Embed and shareable link to comments and polls.
* Repost comments and polls.
* RSVP to an event, invite to an event + notify user if invited.
* Tag friends in posts + notify tagged users.
* Make react / comment on post into a helper function.

* Polls:
* Limit poll voting to just once.
* Poll author can set a time the poll ends.
* After poll ends, just display results, using a bar graph and ordered by “Winning Choice”.
* Notify users who voted in the polls of the results.
* Offer voters the option to vote privately, private to the poll author and other users.

* Miscellaneous:
* Write unit tests for all models, views, and helpers.
* Refactor the back end into multiple Django apps.
