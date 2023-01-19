// Scroll to the bottom of the chat div
function scrollToBottom() {
   messagesBox.scrollTop = messagesBox.scrollHeight;
}
// Load conversation in the messages pane
var messagesBox = document.getElementById('messages-box')
var friendsListBox = document.getElementById('friend-list-box')
var friendId = location.pathname.split('/')[2];
var chattingWithPhoto = document.getElementById('chatting-with-photo')
var chattingWithHandle = document.getElementById('chatting-with-handle')

function loadConversation(friendId) {

   scrollToBottom()

   // Check for/get new messages every ten seconds
   const checkForNewMessages = setInterval(function () {
      updateChat()
   }, 3000);

   messagesBox.innerHTML = ''
   $.ajax({
      type: 'GET',
      url: `/get-messages-ajax/${friendId}`,
      success: function (response) {
         document.getElementById('create-message-input').setAttribute('currently-messaging', friendId)
         const data = response.data
         const friend_info = response.friend_info[0]
         chattingWithPhoto.src = `/media/${friend_info.friend_profile_photo}`
         chattingWithHandle.innerHTML = `${friend_info.friend_handle}`
         friendsListBox.innerHTML = `
            <li>
               <a data-bs-toggle="pill" href="#chatbox">
                  <div class="d-flex align-items-center">
                     <div class="avatar me-2">
                        <img src="/media/${friend_info.friend_profile_photo}" alt="chatuserimage" class="avatar-50 ">
                     </div>
                     <div class="chat-sidebar-name">
                        <h6 class="mb-0">${friend_info.friend_handle}</h6>
                        <span>${friend_info.friend_country}</span>
                     </div>
                  </div>
               </a>
            </li>
         `
         friendsListBox.innerHTML += `<br> <a href="/messages" class="btn btn-primary">See All Threads</a>`
         data.forEach(el => {
            messagesBox.innerHTML += `
            <div class="${el.myMessage ? 'chat chat-left' : 'chat d-flex other-user'}">
               <div class="chat-user">
                  <a class="avatar m-0">
                  <img src="/media/${el.profile_photo}" alt="avatar" class="avatar-35 ">
                  </a>
                  <span class="chat-time mt-1">${el.created}</span>
               </div>
               <div class="chat-detail">
                  <div class="chat-message">
                     <p>${el.messageBody}</p>
                  </div>
               </div>
            </div>
            
      ` // end innerHtml 
         }) // end forEach loop
      },
      error: function (error) {
         console.log('error', error)
      }
   }) // end ajax

}

loadConversation(friendId)

// Post a new message
var createMessageForm = document.getElementById('create-message-form')
var createMessageInput = document.getElementById('create-message-input')
createMessageForm.addEventListener('submit', createMessageForm => {
   createMessageForm.preventDefault()
   let friendId = createMessageInput.getAttribute('currently-messaging')
   $.ajax({
      type: "POST",
      url: '/create-message-ajax/',
      data: {
         'csrfmiddlewaretoken': csrftoken,
         'message': createMessageInput.value,
         'recipient_id': friendId,
      },
      dataType: "json",
      success: function (response) {
         scrollToBottom()
         createMessageInput.value = ''
         const msgData = response.data
         msgData.forEach(el => {
            messagesBox.innerHTML += `
            <div class="${el.myMessage ? 'chat chat-left' : 'chat d-flex other-user'}">
               <div class="chat-user">
                  <a class="avatar m-0">
                  <img src="/media/${el.profile_photo}" alt="avatar" class="avatar-35 ">
                  </a>
                  <span class="chat-time mt-1">${el.created}</span>
               </div>
               <div class="chat-detail">
                  <div class="chat-message">
                     <p>${el.messageBody}</p>
                  </div>
               </div>
            </div>
            `
         })
      },
      error: function (data) {
         alert("Oops! You can't send a message to yourself!.");
      }
   }); // end ajax
}); // end form submit listener


function updateChat() {
   let friendId = createMessageInput.getAttribute('currently-messaging')
   $.ajax({
      type: "POST",
      url: '/get-new-message-ajax/',
      data: {
         'csrfmiddlewaretoken': csrftoken,
         'recipient_id': friendId,
      },
      dataType: "json",
      success: function (response) {
         scrollToBottom()
         const newMsgData = response.data
         newMsgData.forEach(el => {
            messagesBox.innerHTML += `
            <div class="${el.myMessage ? 'chat chat-left' : 'chat d-flex other-user'}">
               <div class="chat-user">
                  <a class="avatar m-0">
                  <img src="/media/${el.profile_photo}" alt="avatar" class="avatar-35 ">
                  </a>
                  <span class="chat-time mt-1">${el.created}</span>
               </div>
               <div class="chat-detail">
                  <div class="chat-message">
                     <p>${el.messageBody}</p>
                  </div>
               </div>
            </div>
            `
         })
      },
      error: function (data) {
         // alert("Oops! There's a problem getting new messages.");
         clearInterval(checkForNewMessages);
      }
   }); // end ajax
}



