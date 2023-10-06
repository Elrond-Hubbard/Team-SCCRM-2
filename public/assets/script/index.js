const loginForm = async (event) => {
    event.preventDefault();

    // Collect the values from the input fields
    let physicianID = document.getElementById('physician').value.trim()
    let password = document.getElementById('password').value.trim()
    
    // Send a POST to the API
    if (physicianID && password) {
        const response = await fetch('/api/doctor/login')
        console.log(response)
    } else {
        console.log('missing either ID or password')
    }

}

document.getElementById('signIn').addEventListener( 'click', loginForm)