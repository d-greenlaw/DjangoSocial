// Profile photo for top nav
const profile_photo = document.getElementById('profile-photo')
$.ajax({
    type: 'GET',
    url: '/accounts/profile-photo-ajax/',
    success: function (response) {
        const data = response.profile_photo
        profile_photo.src = data
    },
    error: function (error) {
        console.log('error', error)
    }
})

// Sidebar Active classes
const myFeedLink = document.getElementById('myFeedLink');
const myProfileLink = document.getElementById('myProfileLink');
const friendListLink = document.getElementById('friendListLink');
const messagesLink = document.getElementById('messagesLink');
const eventsLink = document.getElementById('eventsLink');
const surveysLink = document.getElementById('surveysLink');

var currentPage = location.pathname.split('/')[1];

if (currentPage === 'all-surveys')
    surveysLink.classList.add('active')
else if (currentPage === 'my-profile')
    myProfileLink.classList.add('active')
else if (currentPage === 'friend-list')
    friendListLink.classList.add('active')
else if (currentPage === 'messages')
    messagesLink.classList.add('active')
else if (currentPage === 'events')
    eventsLink.classList.add('active')
else // subject to bugs, fix this:
    myFeedLink.classList.add('active')