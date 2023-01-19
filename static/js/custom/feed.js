postBox = document.getElementById('post-box')
noMorePosts = document.getElementById('no-more-posts')

// React / Unreact to Post
const ReactUnreactPost = () => {
   const likeUnlikeForms = [...document.getElementsByClassName('like-unlike-forms')]
   const loveUnloveForms = [...document.getElementsByClassName('love-unlove-forms')]
   const careUncareForms = [...document.getElementsByClassName('care-uncare-forms')]
   const laughUnlaughForms = [...document.getElementsByClassName('laugh-unlaugh-forms')]
   const wowUnwowForms = [...document.getElementsByClassName('wow-unwow-forms')]
   const sadUnsadForms = [...document.getElementsByClassName('sad-unsad-forms')]
   const angryUnangryForms = [...document.getElementsByClassName('angry-unangry-forms')]

   // Like Unlike Loop
   likeUnlikeForms.forEach(form => form.addEventListener('submit', e => {
      e.preventDefault()
      const clickedIdLike = e.target.getAttribute('like-form-id')
      const thisPostLike = document.getElementById(`post-like-${clickedIdLike}`)
      // This is the like button highlighted 
      const thisLikeButton = document.getElementById(`like-button-${clickedIdLike}`)
      let reaction_type = 'like'
      $.ajax({
         type: 'POST',
         url: `/react-unreact-post-ajax/${reaction_type}/`,
         data: {
            'csrfmiddlewaretoken': csrftoken,
            'pk': clickedIdLike,
            'reaction-type': reaction_type, // there's only one view so it'll use this to know how to handle the type of reaction
         },
         success: function (response) {
            updateReactionCount(response)
            thisPostLike.innerHTML = response.like ? `<img src="/static/images/icon/like.gif" class="gif-emoji img-fluid" alt="">` : ``
            // remove like button coloring if nothing is liked
            if (response.like) {
               thisLikeButton.classList.add('text-primary')
            } else {
               thisLikeButton.classList.remove('text-primary')
            }
         },
         error: function (error) {
            console.log(error)
         }
      })
   }))

   // Love Unlove Loop
   loveUnloveForms.forEach(form => form.addEventListener('submit', e => {
      e.preventDefault()
      const clickedIdLove = e.target.getAttribute('love-form-id')
      const thisPostLove = document.getElementById(`post-love-${clickedIdLove}`)
      // This is the like button highlighted 
      const thisLikeButton = document.getElementById(`like-button-${clickedIdLove}`)
      let reaction_type = 'love'
      $.ajax({
         type: 'POST',
         url: `/react-unreact-post-ajax/${reaction_type}/`,
         data: {
            'csrfmiddlewaretoken': csrftoken,
            'pk': clickedIdLove,
            'reaction-type': reaction_type, // there's only one view so it'll use this to know how to handle the type of reaction
         },
         success: function (response) {
            updateReactionCount(response)
            thisPostLove.innerHTML = response.love ? `<img src="/static/images/icon/love.gif" class="gif-emoji img-fluid" alt="">` : ``
            // remove like button coloring if nothing is liked
            if (response.love) {
               thisLikeButton.classList.add('text-primary')
            } else {
               thisLikeButton.classList.remove('text-primary')
            }
         },
         error: function (error) {
            console.log(error)
         }
      })
   }))

   // Care Uncare Loop
   careUncareForms.forEach(form => form.addEventListener('submit', e => {
      e.preventDefault()
      const clickedIdCare = e.target.getAttribute('care-form-id')
      const thisPostCare = document.getElementById(`post-care-${clickedIdCare}`)
      // This is the like button highlighted 
      const thisLikeButton = document.getElementById(`like-button-${clickedIdCare}`)
      let reaction_type = 'care'
      $.ajax({
         type: 'POST',
         url: `/react-unreact-post-ajax/${reaction_type}/`,
         data: {
            'csrfmiddlewaretoken': csrftoken,
            'pk': clickedIdCare,
            'reaction-type': reaction_type, // there's only one view so it'll use this to know how to handle the type of reaction
         },
         success: function (response) {
            updateReactionCount(response)
            thisPostCare.innerHTML = response.care ? `<img src="/static/images/icon/care.gif" class="gif-emoji img-fluid" alt="">` : ``
            // remove like button coloring if nothing is liked
            if (response.care) {
               thisLikeButton.classList.add('text-primary')
            } else {
               thisLikeButton.classList.remove('text-primary')
            }
         },
         error: function (error) {
            console.log(error)
         }
      })
   }))

   // Laugh Unlaugh Loop
   laughUnlaughForms.forEach(form => form.addEventListener('submit', e => {
      e.preventDefault()
      const clickedIdLaugh = e.target.getAttribute('laugh-form-id')
      const thisPostLaugh = document.getElementById(`post-laugh-${clickedIdLaugh}`)
      // This is the like button highlighted 
      const thisLikeButton = document.getElementById(`like-button-${clickedIdLaugh}`)
      let reaction_type = 'laugh'
      $.ajax({
         type: 'POST',
         url: `/react-unreact-post-ajax/${reaction_type}/`,
         data: {
            'csrfmiddlewaretoken': csrftoken,
            'pk': clickedIdLaugh,
            'reaction-type': reaction_type, // there's only one view so it'll use this to know how to handle the type of reaction
         },
         success: function (response) {
            updateReactionCount(response)
            thisPostLaugh.innerHTML = response.laugh ? `<img src="/static/images/icon/laugh.gif" class="gif-emoji img-fluid" alt="">` : ``
            // remove like button coloring if nothing is liked
            if (response.laugh) {
               thisLikeButton.classList.add('text-primary')
            } else {
               thisLikeButton.classList.remove('text-primary')
            }
         },
         error: function (error) {
            console.log(error)
         }
      })
   }))

   // Wow Unwow Loop
   wowUnwowForms.forEach(form => form.addEventListener('submit', e => {
      e.preventDefault()
      const clickedIdWow = e.target.getAttribute('wow-form-id')
      const thisPostWow = document.getElementById(`post-wow-${clickedIdWow}`)
      // This is the like button highlighted 
      const thisLikeButton = document.getElementById(`like-button-${clickedIdWow}`)
      let reaction_type = 'wow'
      $.ajax({
         type: 'POST',
         url: `/react-unreact-post-ajax/${reaction_type}/`,
         data: {
            'csrfmiddlewaretoken': csrftoken,
            'pk': clickedIdWow,
            'reaction-type': reaction_type, // there's only one view so it'll use this to know how to handle the type of reaction
         },
         success: function (response) {
            updateReactionCount(response)
            thisPostWow.innerHTML = response.wow ? `<img src="/static/images/icon/wow.gif" class="gif-emoji img-fluid" alt="">` : ``
            // remove like button coloring if nothing is liked
            if (response.wow) {
               thisLikeButton.classList.add('text-primary')
            } else {
               thisLikeButton.classList.remove('text-primary')
            }
         },
         error: function (error) {
            console.log(error)
         }
      })
   }))

   // Sad Unsad Loop
   sadUnsadForms.forEach(form => form.addEventListener('submit', e => {
      e.preventDefault()
      const clickedIdSad = e.target.getAttribute('sad-form-id')
      const thisPostSad = document.getElementById(`post-sad-${clickedIdSad}`)
      // This is the like button highlighted 
      const thisLikeButton = document.getElementById(`like-button-${clickedIdSad}`)
      let reaction_type = 'sad'
      $.ajax({
         type: 'POST',
         url: `/react-unreact-post-ajax/${reaction_type}/`,
         data: {
            'csrfmiddlewaretoken': csrftoken,
            'pk': clickedIdSad,
            'reaction-type': reaction_type, // there's only one view so it'll use this to know how to handle the type of reaction
         },
         success: function (response) {
            updateReactionCount(response)
            thisPostSad.innerHTML = response.sad ? `<img src="/static/images/icon/sad.gif" class="gif-emoji img-fluid" alt="">` : ``
            // remove like button coloring if nothing is liked
            if (response.sad) {
               thisLikeButton.classList.add('text-primary')
            } else {
               thisLikeButton.classList.remove('text-primary')
            }
         },
         error: function (error) {
            console.log(error)
         }
      })
   }))

   // Angry Unangry Loop
   angryUnangryForms.forEach(form => form.addEventListener('submit', e => {
      e.preventDefault()
      const clickedIdAngry = e.target.getAttribute('angry-form-id')
      const thisPostAngry = document.getElementById(`post-angry-${clickedIdAngry}`)
      // This is the like button highlighted 
      const thisLikeButton = document.getElementById(`like-button-${clickedIdAngry}`)
      let reaction_type = 'angry'
      $.ajax({
         type: 'POST',
         url: `/react-unreact-post-ajax/${reaction_type}/`,
         data: {
            'csrfmiddlewaretoken': csrftoken,
            'pk': clickedIdAngry,
            'reaction-type': reaction_type, // there's only one view so it'll use this to know how to handle the type of reaction
         },
         success: function (response) {
            updateReactionCount(response)
            thisPostAngry.innerHTML = response.angry ? `<img src="/static/images/icon/angry.gif" class="gif-emoji img-fluid" alt="">` : ``
            // remove like button coloring if nothing is liked
            if (response.angry) {
               thisLikeButton.classList.add('text-primary')
            } else {
               thisLikeButton.classList.remove('text-primary')
            }
         },
         error: function (error) {
            console.log(error)
         }
      })
   }))
} // End Post Reaction Function

// Update Comment Count After Posting New Comment
const updateCommentCount = (clickedIdComment) => {
   const commentCount = document.getElementById(`comment-count-${clickedIdComment}`)
   $.ajax({
      type: 'POST', // GET?
      url: '/get-comment-count-ajax/',
      data: {
         'csrfmiddlewaretoken': csrftoken,
         'pk': clickedIdComment,
      },
      success: function (response) {
         const comment_count = response.comment_count
         commentCount.innerHTML = comment_count
      },
      error: function (error) {
         // console.log(error)
      }
   }) // End AJAX
}

// Create Post 
const createPost = () => {
   const createPostForm = document.getElementById('create-post-form')
   const createPostInput = document.getElementById('create-post-input')
   // in case the form that is void which opens the modal gets text in it by mistake
   const deleteThisValueJustInCase = document.getElementById('delete-this-value-just-in-case')
   createPostForm.addEventListener('submit', e => {
      e.preventDefault()
      // Remove close button from urlMetadataPreview elements:
      // <p class="preview-remove-btn" onclick="removePreview(${el.id})"><i class="ri-close-circle-fill"></i></p>
      previewRemoveBtnsToDeleteBeforeSave = document.getElementsByClassName('preview-remove-btn')
      for (var i = previewRemoveBtnsToDeleteBeforeSave.length - 1; i >= 0; i--) {
         previewRemoveBtnsToDeleteBeforeSave[i].remove();
      }
      createPostInputClean = createPostInput.value
      // iterate the list of original_urls (plain text) and replace with the anchor url
      if (possiblePastedURLList) {
         for (var i = 0, size = possiblePastedURLList.length; i < size; i++) {
            var url_list_item = possiblePastedURLList[i];
            // replace original_url with anchor_url
            // there is a bug if someone pastes the same link two times
            createPostInputClean = createPostInputClean.replace(url_list_item.original_url, url_list_item.anchor_url)
         }
         possiblePastedURLList = []; // empty the list to start fresh
      }
      // Wrapping the post in a "pre" div fixes enter key not saving, (because post is being saved as plain text)
      createPostInputClean = '<pre>' + createPostInputClean + '</pre>'
      // use FormData so that we can upload images along with data
      // https://roytuts.com/how-to-upload-files-using-django-jquery-and-ajax/
      var form_data = new FormData();
      for (var x = 0; x < imageUploadInput.files.length; x++) {
         form_data.append("files[]", imageUploadInput.files[x]);
      }
      form_data.append("csrfmiddlewaretoken", csrftoken);
      form_data.append('createPostInput', createPostInputClean)
      form_data.append('urlMetadataPreview', urlMetadataPreview.innerHTML)
      $.ajax({
         url: '/create-post-ajax/',
         dataType: 'json',
         cache: false,
         contentType: false,
         processData: false,
         data: form_data,
         type: 'post',
         success: function (response) {
            reloadFeed()
            createAlert('Your post was created successfully!')
            clearPostForm()
            $('#post-modal').modal('toggle');
         },
         error: function (response) {
            // console.log(error)
         }
      });
   }); // End Create Post Form Event Listener

}
// End create post function

// Create Comment 
const createComment = () => {
   const commentForms = [...document.getElementsByClassName('comment-forms')]
   commentForms.forEach(form => form.addEventListener('submit', e => {
      e.preventDefault()
      const clickedIdComment = e.target.getAttribute('comment-form-id')
      const commentContent = document.getElementById(`comment-content-${clickedIdComment}`)
      $.ajax({
         type: 'POST',
         url: '/create-comment-ajax/',
         data: {
            'csrfmiddlewaretoken': csrftoken,
            'commentContent': commentContent.value,
            'pk': clickedIdComment,
         },
         success: function (response) {
            // console.log(response)
            commentContent.value = ''
            updateCommentCount(clickedIdComment);
            getComments();
         },
         error: function (error) {
            // console.log(error)
         }
      }) // End AJAX
   })); // End Create Comment Loop
}
// End create comment function

// Get Comments
const getComments = () => {
   const commentBoxes = [...document.getElementsByClassName('post-comments')]
   commentBoxes.forEach(function (e) {
      const clickedIdCommentBox = e.getAttribute('comment-box-id')
      const commentBox = document.getElementById(`post-comment-${clickedIdCommentBox}`)
      $.ajax({
         type: 'POST', // GET?
         url: '/get-comments-ajax/',
         data: {
            'csrfmiddlewaretoken': csrftoken,
         },
         success: function (response) {
            // console.log(response)
            const data = response.data
            commentBox.innerHTML = ''
            data.forEach(el => {
               if (el.post_id == clickedIdCommentBox) {
                  commentBox.innerHTML += `
                        <li class="mt-2 mb-2">
                           <div class="d-flex">
                              <div class="user-img">
                                 <img src="/media/${el.profile_photo}" alt="userimg" class="avatar-35 rounded-circle img-fluid">
                              </div>
                              <div class="comment-data-block ms-3">
                                 <h6>${el.handle}</h6>
                                 <p class="mb-0">${el.comment}</p>
                                 <div class="d-flex flex-wrap align-items-center comment-activity">
                                    <a href="javascript:void();">like</a>
                                    <a href="javascript:void();">reply</a>
                                    <span> ${el.time_since_posted} </span>
                                    ${el.user_is_author ? `<i onclick="deleteComment(${el.id})" class="p-2 text-danger ri-delete-bin-2-fill" data-bs-toggle="modal" data-bs-target="#delete-modal"></i>` : ``}
                                 </div>
                              </div>
                           </div>
                     </li>
                  `
               } // End if statement
            })
            // End data loop
         },
         error: function (error) {
            // console.log(error)
         }
      }) // End AJAX
   }); // End Get Comments Loop
}
// End get comments function

// Delete Comment
const deleteProceedBtn = document.getElementById('delete-proceed-btn')
function deleteComment(commentId) {
   deleteProceedBtn.addEventListener('click', () => {
      $.ajax({
         type: 'POST',
         url: '/delete-comment-ajax/',
         data: {
            'csrfmiddlewaretoken': csrftoken,
            'pk': commentId,
         },
         success: function (response) {
            updateCommentCount(response.post_id);
            getComments();
            $('#delete-modal').modal('toggle');
         },
         error: function (error) {
            // console.log(error)
         }
      }) // End AJAX
   })
} // End Delete Comment

// Load All Posts (Load 3 At a Time)
let visible_posts = 4

// Figure out what page/feed this is for and send to the view, (main/profile feed)
// Get the user / post detail id to send to feed
// Gather which page the user is on, and send filter data to the view
var pageType = location.pathname.split('/')[1];

if (pageType == 'user-profile') {
   var feedType = 'profile-feed'
   var userProfileId = location.pathname.split('/')[2];
   var postDetailId = 'none'
} else if (pageType == 'post-details') {
   var feedType = 'detail-feed'
   var userProfileId = 'none'
   var postDetailId = location.pathname.split('/')[2];
} else {   // pageType == 'main'
   var feedType = 'main-feed'
   var userProfileId = 'none'
   var postDetailId = 'none'
}

// Hide post form on "post-details"
if (pageType == 'post-details') {
   var postToFeed = document.getElementById('post-modal-data')
   postToFeed.remove()
   document.getElementById('feed-spinner').classList.add('invisible')
}

const getPosts = () => {
   $.ajax({
      type: 'GET',
      url: `/feed-posts-ajax/${visible_posts}/${feedType}/${userProfileId}/${postDetailId}`,
      success: function (response) {
         const data = response.data
         if (data < 1) {
            if (pageType !== 'post-details') {
               noMorePosts.replaceWith('No Posts to Load')
               document.getElementById('feed-spinner').classList.add('invisible')
            }
         }
         data.forEach(el => {
            if (el.post_type == 'event') {
               try {
                  postBox.innerHTML += `
                  <div class="col-sm-12">
                     <div class="card card-block card-stretch card-height">
                           <div class="card-body">
                        
                              <div class="d-flex justify-content-between">
                                 <div class="me-3">
                                    <img class="rounded-circle img-fluid" style="width:60px;" src="/media/${el.profile_photo}" alt="">
                                 </div>
                                 <div class="w-100">
                                    <div class="d-flex justify-content-between">
                                       <div>
                                          <h5 class="mb-0 d-inline-block">${el.event_author_handle}</h5>
                                          <span class="mb-0 d-inline-block">Created a New Event</span>
                                          <p class="mb-0 text-primary">${el.time_since_posted}</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <div class="row mt-3">
                                 <div class="col-md-6">
                                    <h4>${el.title} <br> <span class="text-light">${el.event_type}</span></h4>
                                    ${el.notes ? `<p>${el.notes}</p>` : ''}
                                 </div>
                                 <div class="col-md-6">
                                    <p><b>Starts:</b> ${el.event_starts}</p>
                                    <p><b>Ends:</b> ${el.event_ends}</p>
                                 </div>
                              </div>

                           </div>
                     </div>
                  </div>
                  ` // End event/post content
               } catch (error) {
                  console.log(error)
               }
            }
            if (el.post_type == 'poll') {
               try {
                  var pollChoices = el.poll_choices
                  postBox.innerHTML += `
                  <div class="col-sm-12">
                     <div class="card card-block card-stretch card-height">
                           <div class="card-body">
                           
                              <div class="d-flex justify-content-between">
                                 <div class="me-3">
                                    <img class="rounded-circle img-fluid" style="width:60px;" src="/media/${el.profile_photo}" alt="">
                                 </div>
                                 <div class="w-100">
                                    <div class="d-flex justify-content-between">
                                       <div>
                                          <h5 class="mb-0 d-inline-block">${el.poll_author_handle}</h5>
                                          <span class="mb-0 d-inline-block">Created a New Poll</span>
                                          <p class="mb-0 text-primary">${el.time_since_posted}</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <h3 class="text-center mt-4 mb-3">${el.poll_question}</h3>
                              <div class="poll-box-style" id="poll-box-${el.id}">
                                 <!-- AJAX Goes Here -->
                              </div>
                           </div>
                     </div>
                  </div>
                  ` // End poll/post content
                  // Add choices
                  var pollBox = document.getElementById(`poll-box-${el.id}`)
                  for (var i = 0; i < pollChoices.length; i++) {
                     pollBox.innerHTML += `
                        <div class="row m-5">
                           <button id="${el.id}" class="btn btn-outline-primary" onclick="submitPollResponse(this)">${pollChoices[i]}</button>
                        </div>
                     `
                  } // End add choices
               } catch (error) {
                  console.log(error)
               }
            }
            if (el.post_type == 'post') {
               try {
                  postBox.innerHTML += `
                           <div class="col-sm-12" id="repost-id-${el.id}">
                              <div class="card card-block card-stretch card-height">
                                    <div class="card-body">
                                       <div class="user-post-data">
                                          <div class="d-flex justify-content-between">
                                          <div class="me-3">
                                                <img class="rounded-circle img-fluid" style="width:60px;" src="/media/${el.profile_photo}" alt="">
                                          </div>
                                          <div class="w-100">
                                                <div class="d-flex justify-content-between">
                                                   <div class="">
                                                      <h5 class="mb-0 d-inline-block">${el.user_handle}</h5>
                                                      <span class="mb-0 d-inline-block">Created a New Post</span>
                                                      <p class="mb-0 text-primary">${el.time_since_posted}</p>
                                                   </div>
                                                   <div id="card-post-toolbar-${el.id}" class="card-post-toolbar">
                                                      <div class="dropdown">
                                                      <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                      <i class="ri-more-fill"></i>
                                                      </span>
                                                      <div class="dropdown-menu m-0 p-0">
                                                         <a class="dropdown-item p-3" href="https://djangosocial-production.up.railway.app/post-details/${el.id}">
                                                               <div class="d-flex align-items-top">
                                                                  <i class="ri-arrow-up-down-line h4"></i>
                                                                  <div class="data ms-2">
                                                                  <h6>Expand this Post</h6>
                                                                  </div>
                                                               </div>
                                                            </a>
                                                            <a onclick="copyThisPost(${el.id})" class="dropdown-item p-3" href="#" data-bs-toggle="modal" data-bs-target="#copy-post-modal">
                                                               <div class="d-flex align-items-top">
                                                                  <i class="ri-links-line h4"></i>
                                                                  <div class="data ms-2">
                                                                  <h6>Copy link to Post</h6>
                                                                  </div>
                                                               </div>
                                                            </a>
                                                            <a onclick="embedThisPost(${el.id})" class="dropdown-item p-3" href="#" data-bs-toggle="modal" data-bs-target="#embed-modal">
                                                               <div class="d-flex align-items-top">
                                                                  <i class="ri-share-line h4"></i>
                                                                  <div class="data ms-2">
                                                                  <h6>Embed this Post</h6>
                                                                  </div>
                                                               </div>
                                                            </a>
                                                      </div>
                                                      </div>
                                                   </div>
                                                </div>
                                          </div>
                                          </div>
                                       </div>
                                       <div class="mt-3">
                                          <p>${el.post_body}</p>
                                       </div>
                                       <div class="user-post">
                                          <div class="d-grid grid-rows-2 grid-flow-col gap-3" id="post-images-${el.id}">
                                          
                                          </div>
                                       </div>
                                       <div id="comment-area-${el.id}" class="comment-area mt-3">
                                          <div class="d-flex justify-content-between align-items-center flex-wrap">
                                          <div class="like-block position-relative d-flex align-items-center">
                                                <div class="d-flex align-items-center">
                                                   <div class="like-data">
                                                      <div class="dropdown">
                                                      <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                      <!--<img src="/static/images/icon/01.png" class="img-fluid" alt="">-->
                                                      
                                                      ${el.any_reaction ? `<div id="like-button-${el.id}" class="total-like-block me-3 text-primary" margin-top:1%;"><i class="ri-thumb-up-line me-2"></i> Like</div>` : `<div id="like-button-${el.id}" class="total-like-block me-3" style="margin-top:1%;"><i class="ri-thumb-up-line me-2"></i> Like</div>`}

                                                      </span>
                                                      <div class="dropdown-menu py-2">
                                                            <!--<a class="ms-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Like"><img src="/static/images/icon/like.gif" class="gif-emoji img-fluid" alt=""></a>-->
                                                               <div style="float:left;">
                                                                  <form class="like-unlike-forms" like-form-id="${el.id}">
                                                                     <button class="reaction-button" data-bs-toggle="tooltip" data-bs-placement="top" title="Like" id="like-unlike-${el.id}"><img src="/static/images/icon/like.gif" class="gif-emoji img-fluid" alt=""></button>
                                                                  </form>
                                                               </div>
                                                               <div style="float:left;">
                                                                  <form class="love-unlove-forms" love-form-id="${el.id}">
                                                                     <button class="reaction-button" data-bs-toggle="tooltip" data-bs-placement="top" title="love" id="love-unlove-${el.id}"><img src="/static/images/icon/love.gif" class="gif-emoji img-fluid" alt=""></button>
                                                                  </form>
                                                               </div>
                                                               <div style="float:left;">
                                                                  <form class="care-uncare-forms" care-form-id="${el.id}">
                                                                     <button class="reaction-button" data-bs-toggle="tooltip" data-bs-placement="top" title="care" id="care-uncare-${el.id}"><img src="/static/images/icon/care.gif" class="gif-emoji img-fluid" alt=""></button>
                                                                  </form>
                                                               </div>
                                                               <div style="float:left;">
                                                                  <form class="laugh-unlaugh-forms" laugh-form-id="${el.id}">
                                                                     <button class="reaction-button" data-bs-toggle="tooltip" data-bs-placement="top" title="laugh" id="laugh-unlaugh-${el.id}"><img src="/static/images/icon/laugh.gif" class="gif-emoji img-fluid" alt=""></button>
                                                                  </form>
                                                               </div>
                                                               <div style="float:left;">
                                                                  <form class="wow-unwow-forms" wow-form-id="${el.id}">
                                                                     <button class="reaction-button" data-bs-toggle="tooltip" data-bs-placement="top" title="wow" id="wow-unwow-${el.id}"><img src="/static/images/icon/wow.gif" class="gif-emoji img-fluid" alt=""></button>
                                                                  </form>
                                                               </div>
                                                               <div style="float:left;">
                                                                  <form class="sad-unsad-forms" sad-form-id="${el.id}">
                                                                     <button class="reaction-button" data-bs-toggle="tooltip" data-bs-placement="top" title="sad" id="sad-unsad-${el.id}"><img src="/static/images/icon/sad.gif" class="gif-emoji img-fluid" alt=""></button>
                                                                  </form>
                                                               </div>
                                                               <div style="float:left;">
                                                                  <form class="angry-unangry-forms" angry-form-id="${el.id}">
                                                                     <button class="reaction-button" data-bs-toggle="tooltip" data-bs-placement="top" title="angry" id="angry-unangry-${el.id}"><img src="/static/images/icon/angry.gif" class="gif-emoji img-fluid" alt=""></button>
                                                                  </form>
                                                               </div>
                                                            </div>
                                                            
                                                      </div>
                                                      </div>
                                                   </div>
                  
                                                   <div class="ms-2 me-3">
                                                      <span onclick="repostThisPost(${el.id})" data-bs-toggle="modal" data-bs-target="#post-modal"><i class="ri-repeat-2-line"></i> Repost</span>
                                                   </div>

                                                 <div class="total-like-block ms-2 me-3">
                                                      <div class="dropdown">
                                                      <!--<span class="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">-->
                                                      <span id="reaction-count-${el.id}">
                                                      ${el.reaction_count}
                                                      </span>
                                                      <!--<div class="dropdown-menu">
                                                            <a class="dropdown-item" href="#">Max Emum</a>
                                                            <a class="dropdown-item" href="#">Bill Yerds</a>
                                                            <a class="dropdown-item" href="#">Hap E. Birthday</a>
                                                            <a class="dropdown-item" href="#">Tara Misu</a>
                                                            <a class="dropdown-item" href="#">Midge Itz</a>
                                                            <a class="dropdown-item" href="#">Sal Vidge</a>
                                                            <a class="dropdown-item" href="#">Other</a>
                                                      </div> -->
                                                      </div>
                                                   </div> 
                                                </div>
                                                <div class="total-comment-block me-3" id="total-comment-adjust">
                                                   <div class="dropdown">
                                                      <span id="comment-count-${el.id}" class="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                      ${el.comment_count}
                                                      </span>
                                                      <!--<div class="dropdown-menu">
                                                      <a class="dropdown-item" href="#">Max Emum</a>
                                                      <a class="dropdown-item" href="#">Bill Yerds</a>
                                                      <a class="dropdown-item" href="#">Hap E. Birthday</a>
                                                      <a class="dropdown-item" href="#">Tara Misu</a>
                                                      <a class="dropdown-item" href="#">Midge Itz</a>
                                                      <a class="dropdown-item" href="#">Sal Vidge</a>
                                                      <a class="dropdown-item" href="#">Other</a>
                                                      </div>-->
                                                   </div>
                                                </div>
                                                <div class="total-like-block">
                                                   <div style="float:left;" id="post-like-${el.id}"> ${el.like ? `<img src="/static/images/icon/like.gif" class="img-fluid gif-emoji" alt="">` : ''} </div>
                                                   <div style="float:left;" id="post-love-${el.id}"> ${el.love ? `<img src="/static/images/icon/love.gif" class="img-fluid gif-emoji" alt="">` : ''} </div>
                                                   <div style="float:left;" id="post-care-${el.id}"> ${el.care ? `<img src="/static/images/icon/care.gif" class="img-fluid gif-emoji" alt="">` : ''} </div>
                                                   <div style="float:left;" id="post-laugh-${el.id}"> ${el.laugh ? `<img src="/static/images/icon/laugh.gif" class="img-fluid gif-emoji" alt="">` : ''} </div>
                                                   <div style="float:left;" id="post-wow-${el.id}"> ${el.wow ? `<img src="/static/images/icon/wow.gif" class="img-fluid gif-emoji" alt="">` : ''} </div>
                                                   <div style="float:left;" id="post-sad-${el.id}"> ${el.sad ? `<img src="/static/images/icon/sad.gif" class="img-fluid gif-emoji" alt="">` : ''} </div>
                                                   <div style="float:left;" id="post-angry-${el.id}"> ${el.angry ? `<img src="/static/images/icon/angry.gif" class="img-fluid gif-emoji" alt="">` : ''} </div>
                                             </div>
                                          </div>
                                          <!--<div class="share-block d-flex align-items-center feather-icon mt-2 mt-md-0">
                                                <a href="javascript:void();" data-bs-toggle="offcanvas" data-bs-target="#share-btn" aria-controls="share-btn"><i class="ri-share-line"></i>
                                                <span class="ms-1">99 Share</span></a>                           
                                          </div>-->
                                          </div>
                                          <div id="comment-area-form-${el.id}">
                                             <hr>
                                             <ul class="post-comments list-inline p-0 m-0" id="post-comment-${el.id}" comment-box-id="${el.id}">
                                             <!-- AJAX Goes Here -->
                                             </ul>
                                             <form class="comment-forms comment-text d-flex align-items-center mt-3" comment-form-id="${el.id}"">
                                                <input id="comment-content-${el.id}" type="text" class="form-control rounded" placeholder="Write your comment">
                                                <!--<div class="comment-attagement d-flex">
                                                   <a href="javascript:void();"><i class="ri-link me-3"></i></a>
                                                   <a href="javascript:void();"><i class="ri-user-smile-line me-3"></i></a>
                                                   <a href="javascript:void();"><i class="ri-camera-line me-3"></i></a>
                                                </div>-->
                                             </form>
                                          </div>
                                          
                                       </div>
                                    </div>
                              </div>
                           </div>

                           <!-- Image View Modal --> 
                           <div class="modal fade" id="image-view-modal-${el.id}" tabindex="-1" aria-labelledby="image-view-modalLabel" aria-hidden="true" >
                           <div class="modal-dialog modal-lg modal-fullscreen-sm-down">
                              <div class="modal-content">
                                 <div class="modal-header">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="ri-close-fill"></i></button>
                                 </div>
                                 <div class="modal-body">
                                    <div class="row">
                                       <div class="col-md-12">
                                       <!-- Start Carousel -->
                                          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                             <div class="carousel-inner" id="image-view-box-${el.id}">
                                                <div class="carousel-item active" id="image-view-box-active-${el.id}">
                                                <!-- AJAX Goes Here -->
                                                </div>
                                             </div>
                                             <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Previous</span>
                                             </a>
                                             <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Next</span>
                                             </a>
                                          </div>
                                       <!-- End Carousel -->
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        ` // End post content

                  // Carousel controls
                  $('.carousel').carousel({
                     interval: 0
                  })

                  $('.carousel-control-prev').click(function () {
                     $('.carousel').carousel('prev');
                  });

                  $('.carousel-control-next').click(function () {
                     $('.carousel').carousel('next');
                  });

                  // End carousel controls

                  // Images will be opened in modal, click one image/ show in modal with arrows to view others
                  // Also add infinite photos to a post - todo: limit images to six, show the rest in a stack
                  var postImagesBox = document.getElementById(`post-images-${el.id}`)
                  var postImageViewBoxActive = document.getElementById(`image-view-box-active-${el.id}`)
                  var postImageViewBox = document.getElementById(`image-view-box-${el.id}`)

                  var postImages = el.images
                  // put the first image in the list inside the active class
                  postImageViewBoxActive.innerHTML += `<img class="d-block w-100" src="/media/${postImages[0]}" alt="First slide">`
                  for (var i = 0; i < postImages.length; i++) {
                     // add to post itself
                     postImagesBox.innerHTML += `<div data-bs-toggle="modal" data-bs-target="#image-view-modal-${el.id}" class="row-span-1"><img src="/media/${postImages[i]}" alt="post-image" class="img-fluid rounded w-100"></div>`
                     // add to image view modal
                     if (i !== 0) {  // skip the first image
                        postImageViewBox.innerHTML += `
                              <div class="carousel-item">
                                 <img class="d-block w-100" src="/media/${postImages[i]}" alt="Other slides">
                              </div>
                              `
                     }
                  }
               } catch (error) {
                  console.log(error)
               }
            } // End if is_poll
         });
         ReactUnreactPost();
         createComment();
         getComments();
      },
      error: function (error) {
         console.log('error', error)
      }
   }) // End AJAX
}
try {
   window.onscroll = function () {
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
         visible_posts += 4
         getPosts()
      }
   }
}
catch (err) {
   console.log('NoMorePosts Element Did Not Load')
}

getPosts() // Get all posts on page load
createPost()

// Check if string is valid url
// https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
const isValidUrl = urlString => {
   var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
   return !!urlPattern.test(urlString);
}
// Detecting paste (of url)
// https://stackoverflow.com/questions/10827256/how-to-detect-copy-and-paste-in-javascript
const postInput = document.getElementById('create-post-input');
const urlMetadataPreview = document.getElementById('url-metadata-preview');
const postSubmitBtn = document.getElementById('post-submit-btn');

function postSubmitButtonToggle() {
   // if(postInput.value == '' || urlMetadataPreview.childNodes.length > 0){
   if (postInput.value == '') {
      postSubmitBtn.classList.remove('btn-primary')
      postSubmitBtn.classList.add('btn-light')
   } else {
      postSubmitBtn.classList.add('btn-primary')
      postSubmitBtn.classList.remove('btn-light')
   }
   // TODO: Change button color when photo uploaded/metadata preview is used
   // if(output.innerHTML !== ''){
   //    postSubmitBtn.classList.add('btn-primary')
   //    postSubmitBtn.classList.remove('btn-light')
   // }else{
   //    postSubmitBtn.classList.remove('btn-primary')
   //    postSubmitBtn.classList.add('btn-light')
   // }
}

const checkForPostInputValue = setInterval(function () {
   postSubmitButtonToggle()
}, 1000);


// Check the url and send to back end for scraping
var possiblePastedURLList = [];
postInput.addEventListener('paste', e => {
   let possiblePastedURL = e.clipboardData.getData('text/plain');
   if (isValidUrl(possiblePastedURL) == true) {  // if possiblePastedURL is in fact a URL, check if it's valid before grabbing metadata
      // add to list in a variable before save iterate the list and replace each anchor wrapped
      possiblePastedURLList.push({
         anchor_url: '<a target="__blank" href="' + possiblePastedURL + '">' + possiblePastedURL + '</a>',
         original_url: possiblePastedURL,
      });
      // before saving the post - replace the original_url with the anchor_url (see CreatePost function)
      // do this if they entered a valid URL:
      $.ajax({
         type: 'POST', // GET?
         url: '/get-url-metadata-ajax/',
         data: {
            'csrfmiddlewaretoken': csrftoken,
            'postInput': possiblePastedURL,
         },
         success: function (response) {
            const data = response.data
            // remove the url 'possiblePastedURL' from 'postInput'
            data.forEach(el => {
               urlMetadataPreview.innerHTML += `
                  <div class="row p-1" style="background-color:#f9f9f9;" id="remove-preview-${el.id}">
                     <div class="col-md-6 mt-3 mb-3">
                        <img class="img-fluid rounded w-100" src="${el.meta_image}" alt="external-post-img">
                     </div>
                     <div class="col-md-6 mt-3 mb-3">
                        <p class="preview-remove-btn" onclick="removePreview(${el.id})"><i class="ri-close-circle-fill"></i></p>
                        <b><p>${el.meta_title}</p></b> 
                        <p>${el.meta_description}</p> 
                        <a class="text-muted" href="${el.full_meta_url}" target="__blank"><i class="ri-link-m"></i> ${el.cleaned_meta_url}</a>
                     </div>
                  </div>
                  <br>
               `
            })
         },
         error: function (error) {
            // console.log(error)
         }
      }) // End AJAX
   } else {
      // window.alert('This is not a valid url!')
   }
})
// Remove meta data preview on button click
function removePreview(el) {
   removePreviewElement = document.getElementById('remove-preview-' + el)
   removePreviewElement.remove();
}
// Giphy API search
const gifSearchInput = document.getElementById('gif-search-input')
const gifSearchResultsBox = document.getElementById('gif-search-results-box')
let searchAmount = 10
let gifSearchQuery = ''
gifSearchInput.addEventListener('keypress', (event) => {
   if (event.key === 'Enter') {
      gifSearchResultsBox.innerHTML = ''
      gifSearchQuery = gifSearchInput.value
      // Giphy API - Search
      var xhr = $.get('http://api.giphy.com/v1/gifs/search?q=' + gifSearchQuery + '&api_key=2O07FhBorrzhjHNQoCyTswTzKv4zG3K5&limit=' + searchAmount);
      xhr.done(function (response) {
         gifSearchInput.value = ''
         response.data.forEach(el => {
            gifSearchResultsBox.innerHTML += `<div class="col-md-12 text-center"><img class="p-2 mb-2 mt-2" onclick="addGifToMetadataPreview(this);" src="${el.images.downsized.url}"></div>`
         });
         gifSearchResultsBox.innerHTML += `<div class="row text-center mb-3"><div class="col-md-12"><a class="btn btn-primary" onclick="loadMoreGifs('${gifSearchQuery}')">Load More</a></div></div>`
      });

   }
});
// Load more Gifs - 'searchAmount += 5 each go around, and clear the results'
function loadMoreGifs(searchTerm) {
   searchAmount += 10
   gifSearchResultsBox.innerHTML = '' // clear results box
   // Giphy API - Search
   var xhr = $.get('http://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key=koGzjROPm78OX6eyy2jMVj0NBFB0dZGE&limit=' + searchAmount);
   xhr.done(function (response) {
      response.data.forEach(el => {
         gifSearchResultsBox.innerHTML += `<div class="col-md-12 text-center"><img class="p-2 mb-2 mt-2" onclick="addGifToMetadataPreview(this);" src="${el.images.downsized.url}"></div>`
      });
      gifSearchResultsBox.innerHTML += `<div class="row text-center mb-3"><div class="col-md-12"><a class="btn btn-primary" onclick="loadMoreGifs('${searchTerm}')">Load More</a></div></div>`
   });
}
// Add gif to urlMetadataPreview
function addGifToMetadataPreview(this_element) {
   urlMetadataPreview.appendChild(this_element);
   this_element.removeAttribute("onclick"); // important! without this user can click it in the post and it hides the gif
}
// Upload images to post, and preview them
// https://medium.com/@codefoxx/how-to-upload-and-preview-an-image-with-javascript-749b92711b91
const imageUploadInput = document.getElementById('image-upload-input')
const output = document.querySelector("output")
let imagesArray = []
function showImagesPreview() {
   let images = ""
   imagesArray.forEach((image, index) => {
      images += `<div class="image p-2 text-center">
               <span style="cursor:pointer; font-size:17px !important;" class="text-danger" onclick="deleteImage(${index})"><i class="ri-close-fill"></i> Remove</span>
                <img style="width:80%;" src="${URL.createObjectURL(image)}" alt="image">
              </div>`
   })
   output.innerHTML = images
}
// Delete an image from the preview and the file input field
function deleteImage(index) {
   imagesArray.splice(index, 1)
   showImagesPreview()
   const dt = new DataTransfer()
   const input = imageUploadInput
   const { files } = input

   for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (index !== i)
         dt.items.add(file) // here you exclude the file. thus removing it.
   }

   input.files = dt.files // Assign the updates list
}
// Upload an image preview
imageUploadInput.addEventListener("change", function () {
   const files = imageUploadInput.files
   for (var i = 0; i < files.length; i++) {
      imagesArray.push(files[i])
   }
   showImagesPreview()
});

// Repost a post
function repostThisPost(elementId) {
   var elementToRepost = document.getElementById(`repost-id-${elementId}`)
   userHandle = document.getElementById('current-user-handle').innerHTML
   // Remove comment area
   commentArea = document.getElementById(`comment-area-${elementId}`)
   commentAreaForm = document.getElementById(`comment-area-form-${elementId}`)
   postOptionsDots = document.getElementById(`card-post-toolbar-${elementId}`)
   elementToRepost = elementToRepost.innerHTML.replace(commentArea.innerHTML, '')
   elementToRepost = elementToRepost.replace(commentAreaForm.innerHTML, '')
   elementToRepost = elementToRepost.replace(postOptionsDots.innerHTML, '')
   urlMetadataPreview.innerHTML += `
      <div class="mt-2 mb-2">
         <i class="ri-repeat-2-line text-success"></i> <b>${userHandle}</b> Reposted
      </div>
   `
   urlMetadataPreview.innerHTML += `<a class="repost-box" href="https://djangosocial-production.up.railway.app/post-details/${elementId}">${elementToRepost}</a>`
}
// Embed post
function embedThisPost(elementId) {
   var embedTextArea = document.getElementById('embed-text-area')
   embedTextArea.innerHTML = `<iframe src="https://djangosocial-production.up.railway.app/post-details/${elementId}" width="100%" height="100%" style="border:none;"></iframe>`
}
// Embed copy link
function copyEmbedCode() {
   var embedTextArea = document.getElementById('embed-text-area') // can we get this from the above function?
   embedTextArea.select();
   document.execCommand("copy");
   $('#embed-modal').modal('toggle');
   // createAlert('You copied an embed code for this post!')
}
// Copy post
function copyThisPost(elementId) {
   var copyPostInput = document.getElementById('copy-post-input')
   copyPostInput.value = `https://djangosocial-production.up.railway.app/post-details/${elementId}`
}
// Copy link
function copyPostLink() {
   var copyPostInput = document.getElementById('copy-post-input') // can we get this from the above function?
   copyPostInput.select();
   document.execCommand("copy");
   $('#copy-post-modal').modal('toggle');
   // createAlert('You copied an link to this post!')
}

///////////// SUBMIT THE POLL FORM WHEN BUTTON/CHOICE IS CLICKED ///////////
const showPollResults = (clickedChoiceButtonPollId) => {
   var pollBox = document.getElementById(`poll-box-${clickedChoiceButtonPollId}`)
   $.ajax({
      type: 'POST',
      url: '/poll-results-ajax/',
      data: {
         'csrfmiddlewaretoken': csrftoken,
         'poll_id': clickedChoiceButtonPollId,
      },
      success: function (response) {
         pollBox.innerHTML = '' // Clear the pollBox
         const poll_results = response.poll_results
         poll_results.forEach(el => {
            pollBox.innerHTML += `
                     <div class="row p-4">
                         <div class="col-md-2" style="margin-top:.2125rem !important">
                             ${el.user_selected ? '<h4><i style="font-size:30px;" class="text-light ri-checkbox-circle-line"></i></h4>' : ''}
                         </div>
                         <div class="col-md-6 mt-2">
                             <h4><b>${el.choice_text}</b></h4>
                         </div>
                         <div class="col-md-4 mt-2">
                             <h4><b>${el.choice_percent}%</b></h4>
                         </div>
                     </div>
                 `
         });
         // Show all votes count
         pollBox.innerHTML += `
                 <hr>
                 <div class="card-footer">
                     <div class="row">
                         <p class="text-light"><b>${response.all_votes} Votes</b></p>
                     </div>
                 </div>
                 `
      },
      error: function (error) {
         // console.log(error)
      }
   }) // End AJAX
};


function submitPollResponse(clickedChoiceButton) {
   // Submit User's Poll Choice via AJAX POST method
   $.ajax({
      type: 'POST',
      url: '/save-poll-entry-ajax/',
      data: {
         'csrfmiddlewaretoken': csrftoken,
         'poll_response': clickedChoiceButton.innerHTML,
         'poll_id': clickedChoiceButton.id,
      },
      success: function (response) {
         showPollResults(clickedChoiceButton.id);
      },
      error: function (error) {
         // console.log(error)
      }
   }) // End AJAX

} // End Click Event

// Create "Event"
// Close post modal, open event modal
function openEventModal() {
   $('#post-modal').modal('toggle')
   $('#new-event-modal').modal('toggle')
}
// Create "Event" form
var newEventType = document.getElementById('newEventType')
var newEventName = document.getElementById('newEventName')
var newEventNotes = document.getElementById('newEventNotes')
var newEventStartsDate = document.getElementById('newEventStartsDate')
var newEventStartsTime = document.getElementById('newEventStartsTime')
var newEventEndsDate = document.getElementById('newEventEndsDate')
var newEventEndsTime = document.getElementById('newEventEndsTime')
// Make sure the user can't pick a date in the past validation
// https://bobbyhadz.com/blog/javascript-set-current-date-to-input
function padTo2Digits(num) {
   return num.toString().padStart(2, '0');
}
function formatDate(date = new Date()) {
   return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
   ].join('-');
}
newEventStartsDate.min = formatDate();
newEventEndsDate.min = formatDate();

newEventType.value = ''
newEventName.value = ''
newEventNotes.value = ''
newEventStartsDate.value = ''
newEventStartsTime.value = ''
newEventEndsDate.value = ''
newEventEndsTime.value = ''
var createEventForm = document.getElementById('create-event-form')
createEventForm.addEventListener('submit', createEventForm => {
   createEventForm.preventDefault()
   $.ajax({
      type: "POST",
      url: '/add-event',
      data: {
         'csrfmiddlewaretoken': csrftoken,
         'newEventType': newEventType.value,
         'title': newEventName.value,
         'start-date': newEventStartsDate.value,
         'start-time': newEventStartsTime.value,
         'end-date': newEventEndsDate.value,
         'end-time': newEventEndsTime.value,
         'notes': newEventNotes.value,
      },
      dataType: "json",
      success: function (data) {
         reloadFeed()
         createAlert('Event was created successfully!')
         clearPostForm()
         $("#new-event-modal").modal("toggle");
      },
      error: function (data) {
         // createAlert('Oops! There\'s a problem.')
      }
   }); // End AJAX
}); // End form submit listener

// Upcoming Birthdays
var upcomingBirtydayBox = document.getElementById('upcoming-birthday-box')
$.ajax({
   type: 'GET',
   url: '/get-upcoming-birthdays-ajax',
   success: function (response) {
      const data = response.data
      if (data.length === 0) {
         document.getElementById('upcoming-birthday-card').remove()
      } else {
         data.forEach(el => {
            upcomingBirtydayBox.innerHTML += `
               <li class="d-flex mb-4 align-items-center active">
                  <img src="/media/${el.profile_photo}" alt="story-img" class="rounded-circle img-fluid">
                  <div class="stories-data ms-3">
                     <a href=""><h5>${el.friend_handle}</h5>
                     <p class="mb-0">${el.birthday_is}</p></a>
                  </div>
               </li>
            `
         });
      }
      upcomingBirtydayBox.innerHTML += `
         <div class="row">
            <div class="col-md-12 text-center">
               <a href="/birthdays" class="btn btn-outline-primary w-100">See All</a>
            </div>
         </div>
      `
   },
   error: function (error) {
      // console.log(error)
   }
}) // End AJAX


// Recent Events
var recentEventsBox = document.getElementById('recent-events-box')
$.ajax({
   type: 'GET',
   url: '/get-recent-events-ajax',
   success: function (response) {
      const data = response.data
      if (data.length === 0) {
         document.getElementById('events-card').remove()
      } else {
         data.forEach(el => {
            recentEventsBox.innerHTML += `
            <li class="d-flex mb-4 align-items-center active">
               <img src="/media/${el.profile_photo}" alt="story-img" class="rounded-circle img-fluid">
               <div class="stories-data ms-3">
                  <h5>${el.event_title}</h5>
                  <p class="mb-0"><b>${el.author_handle}</b></p>
                  <p class="mb-0">${el.event_starts}</p>
               </div>
            </li>
            `
         });
      } // End if statement
   },
   error: function (error) {
      // console.log(error)
   }
}) // End AJAX

// People You May Know
var peopleYouMayKnowBox = document.getElementById('people-you-may-know-box')
$.ajax({
   type: 'GET',
   url: '/get-people-you-may-know-ajax',
   success: function (response) {
      const data = response.data
      if (data.length === 0) {
         document.getElementById('people-you-may-know-card').remove()
      } else {
         data.forEach(el => {
            peopleYouMayKnowBox.innerHTML += `
               <li class="d-flex mb-3 align-items-center active">
                  <img src="/media/${el.profile_photo}" alt="story-img" class="rounded-circle img-fluid">
                  <div class="stories-data ms-3">
                     <a href=""><h5>${el.person_handle}</h5></a>
                     <p class="mb-0">${el.mutual_friend_count}</p>
                     <p class="mb-0">Joined ${el.person_joined}</p></a>
                  </div>
               </li>
            `
         });
      } // End if statement
   },
   error: function (error) {
      // console.log(error)
   }
}) // End AJAX


function reloadFeed() {
   // Reload the feed
   postBox.innerHTML = ''
   visible_posts = 4
   getPosts()
   // End reload the feed
}

function updateReactionCount(response) {
   document.getElementById(`reaction-count-${response.id}`).innerHTML = response.reaction_count
}

function clearPostForm(){
   document.getElementById('create-post-input').value = ''
   urlMetadataPreview.innerHTML = ''
   // Delete any images in the upload image field and preview
   output.innerHTML = ''
   imageUploadInput.value = ''
}