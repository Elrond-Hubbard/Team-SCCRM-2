const loginForm = async (event) => {
    event.preventDefault();

    // Collect the values from the input fields
    let physicianID = document.getElementById('physician').value.trim()
    let password = document.getElementById('password').value.trim()
    
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
    } else {
        console.log('missing either ID or password')
    }

}

document.getElementById('signIn').addEventListener( 'click', loginForm)