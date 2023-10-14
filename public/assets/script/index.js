const warningEl = document.getElementById('warningMessage')

const loginForm = async (event) => {
    event.preventDefault();

    // Collect the values from the input fields
    let physicianID = document.getElementById('physician').value.trim()
    let password = document.getElementById('password').value.trim()
    
    // Clear warning message
    warningEl.innerHTML=''

    // Send a POST to the API
    if (physicianID && password) {
        const response = await fetch('/api/login/', {
            method: 'POST',
            body: JSON.stringify({physicianID, password}),
            headers: { 'Content-Type': 'application/json'}
        })
    // redirect with a successful login
    if (response.ok) {
        document.location.replace('/home')
    }
    } else { // display warning message
        warningEl.innerHTML = `
        <div class="alert alert-danger mx-3 mt-3 p-3" role="alert">
            <strong>Your Physician ID/Password do not match our records.</strong>
        </div>
        `
    }

}

document.getElementById('signIn').addEventListener( 'click', loginForm)