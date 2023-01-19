// Notification updates for top nav
var commentNotifications = document.getElementById('comment-notifications')
var messageNotifications = document.getElementById('message-notifications')
var friendRequestNotifications = document.getElementById('friend-request-notifications')
var mesageNotificationBox = document.getElementById('message-notification-box') // Hide if no alerts
var commentNotificationBox = document.getElementById('comment-notification-box') // Hide if no alerts
var friendRequestNotificationBox = document.getElementById('friend-request-notification-box') // Hide if no alerts

function updateNavNotifications() {

    try {
        var commentNotificationCount = document.getElementsByClassName('cmt-notif-count')
    } catch (error) {
        console.log(error)
    }

    try {
        var messageNotificationCount = document.getElementsByClassName('msg-notif-count')
    } catch (error) {
        console.log(error)
    }

    try {
        var friendRequestNotificationCount = document.getElementsByClassName('frd-req-notif-count')
    } catch (error) {
        console.log(error)
    }

    $.ajax({
        type: 'GET',
        url: '/accounts/update-notification-nav-ajax/',
        success: function (response) {
            // First Update Badge/Counter(s)
            try {
                // Message Count
                for (var i = 0; i < messageNotificationCount.length; i++) {
                    if (response.msg_notif_count === 0) {
                        messageNotificationCount[i].classList.add('invisible')
                    } else {
                        messageNotificationCount[i].classList.remove('invisible')
                        messageNotificationCount[i].innerHTML = response.msg_notif_count
                    }
                } // End for loop
                // Comment Count
                for (var i = 0; i < commentNotificationCount.length; i++) {
                    if (response.cmt_notif_count === 0) {
                        commentNotificationCount[i].classList.add('invisible')
                    } else {
                        commentNotificationCount[i].classList.remove('invisible')
                        commentNotificationCount[i].innerHTML = response.cmt_notif_count
                    }
                } // End for loop
                // Friend Request Count
                for (var i = 0; i < friendRequestNotificationCount.length; i++) {
                    if (response.frd_req_notif_count === 0) {
                        friendRequestNotificationCount[i].classList.add('invisible')
                    } else {
                        friendRequestNotificationCount[i].classList.remove('invisible')
                        friendRequestNotificationCount[i].innerHTML = response.frd_req_notif_count
                    }
                } // End for loop

                // Then, update the dropdowns
                // Comment dropdown
                const comment_notifications = response.cmt_notif
                if (comment_notifications.length < 1) {
                    commentNotificationBox.classList.add('invisible')
                } else {
                    commentNotificationBox.classList.remove('invisible')
                }
                commentNotifications.innerHTML = ''
                comment_notifications.forEach(el => {
                    commentNotifications.innerHTML += `
                        <a href="/post-details/${el.comment_post_id}" class="iq-sub-card">
                            <div class="d-flex  align-items-center">
                                <div class="">
                                    <img class="avatar-40 rounded" src="/media/${el.comment_author_photo}" alt="">
                                </div>
                                <div class=" w-100 ms-3">
                                    <h6 class="mb-0 ">
                                        ${el.comment_author_handle}
                                    </h6>
                                    <i>
                                    <small class="float-left font-size-12">
                                        ${el.comment}
                                    </small></i>
                                    <br>
                                    <small class="float-left font-size-12">
                                        ${el.comment_created}
                                    </small>
                                </div>
                            </div>
                        </a>
                    `
                });
                // Message dropdown
                const message_notifications = response.msg_notif
                if (message_notifications.length < 1) {
                    mesageNotificationBox.classList.add('invisible')
                } else {
                    mesageNotificationBox.classList.remove('invisible')
                }
                messageNotifications.innerHTML = ''
                message_notifications.forEach(el => {
                    messageNotifications.innerHTML += `
                    <a href="/message-thread/${el.message_sender_id}" class="iq-sub-card">
                        <div class="d-flex  align-items-center">
                            <div class="">
                                <img class="avatar-40 rounded"
                                    src="/media/${el.message_sender_photo}" alt="">
                            </div>
                            <div class=" w-100 ms-3">
                                <h6 class="mb-0 ">${el.message_sender_handle}</h6>
                                <i><small class="float-left font-size-12">${el.message_body}</small></i>
                                <br>
                                <small class="float-left font-size-12">${el.message_created}</small>
                            </div>
                        </div>
                    </a>
                    `
                });
                // Friend Request dropdown
                const friend_request_notifications = response.frd_req_notif
                if (friend_request_notifications.length < 1) {
                    friendRequestNotificationBox.classList.add('invisible')
                } else {
                    friendRequestNotificationBox.classList.remove('invisible')
                }
                friendRequestNotifications.innerHTML = ''
                friend_request_notifications.forEach(el => {
                    friendRequestNotifications.innerHTML += `
                        <div class="iq-friend-request">
                            <div
                                class="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <img class="avatar-40 rounded"
                                        src="/media/${el.friend_request_sender_profile_photo}" alt="">
                                    <a href="/user-profile/${el.friend_request_sender_id}">
                                    <div class="ms-3">
                                        <h6 class="mb-0 ">${el.friend_request_sender_handle}</h6>
                                        <p class="mb-0">${el.friend_request_sender_friend_count} friends</p>
                                    </div></a>
                                </div>
                                <div class="d-flex align-items-center">
                                    <a href="/confirm-friend-request/${el.notification_id}"
                                        class="me-3 btn btn-primary rounded">Confirm</a>
                                    <a href="/delete-friend-request/${el.notification_id}"
                                        class="me-3 btn btn-secondary rounded">Delete Request</a>
                                </div>
                            </div>
                        </div>
                    `
                });

            } catch (error) {
                console.log(error)
            }
        },
        error: function (error) {
            console.log('error', error)
        }
    }) // End AJAX

}

updateNavNotifications()

// Check for/get new messages every ten seconds
const checkForNewMessages = setInterval(function() {
    updateNavNotifications()
}, 3000);