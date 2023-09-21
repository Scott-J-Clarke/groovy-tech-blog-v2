const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            // The request includes 'email' and 'password' as JSON data in the request body:
            body: JSON.stringify({ email, password }),
            // Request header tells server to expect and parse request body as JSON:
            headers: { 'Content-Type': 'application/json' },
        });

        // If the server response is successful, user is sent to the dashboard:
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to log in.');
        }
    }
};

// When form is submitted, 'loginFormHanlder' function is called:
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
