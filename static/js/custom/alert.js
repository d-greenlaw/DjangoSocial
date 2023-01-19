function createAlert(alertText) {
    alert = document.getElementById('alert')
    alert.classList.add('alert', 'alert-primary')
    alert.innerHTML = `
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <h4 class="mt-2 mb-2">${alertText}</h4>
                </div>
            </div>
        </div>
    `
    function hideAlert() {
        alert.remove()
    }
    setTimeout(hideAlert, 6000)
}