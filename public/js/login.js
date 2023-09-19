// This is a 'login form' handler function. When the form is submitted, the function is triggered:
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Function retrieves values entered in the email and password input fields using 'document.querySelector.'
    // Values are 'trimmed' to remove any leading or trailing whitespace:
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Checks if both 'email' and 'password' have been entered.
    // If both values ('email' and 'password') exist, sends a POST request to '/api/users/login' using fetch() function:
    if (email && password) {
        const response = await fetch('/api/users/login', { // Is '/api/users/login' route in the code somewhere?
            method: 'POST',
            // The request includes 'email' and 'password' as JSON data in the request body.
            body: JSON.stringify({ email, password }),
            // Request header specifies that 'Content-Type' is 'application/json.'
            // The server knows to expect and parse the request body as JSON:
            // (Different types of data can be sent in the request body, such as form data or plain text.)
            headers: { 'Content-Type': 'application/json' },
        });

        // If the response from the server is successful (status code '200'), user is sent to the homepage:
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in.');
        }
    }
};

// When the form is submitted, the 'loginFormHanlder' function is invoked:
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
