
/// THIS POLL JS IS JUST FOR THE SINGLE PAGE POLL FOR USERS & SINGLE PAGE POLL RESULTS FOR AUTHOR
/// THIS JS DOES NOT INCLUDE THE FEED POLL VIEW, FOR THAT SEE MAIN.JS

///////////// SUBMIT THE POLL FORM WHEN BUTTON/CHOICE IS CLICKED ///////////
const pollId = location.pathname.split('/')[2] // for redirect (testing only)
const pollBox = document.getElementById('poll-box')

const showPollResults = () => {
    $.ajax({
        type: 'POST',
        url: '/poll-results-ajax/',
        data: {
            'csrfmiddlewaretoken': csrftoken,
            'poll_id': pollId,
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
            'poll_id': pollId,
        },
        success: function (response) {
            showPollResults();
        },
        error: function (error) {
            // console.log(error)
        }
    }) // End AJAX

} // End Click Event