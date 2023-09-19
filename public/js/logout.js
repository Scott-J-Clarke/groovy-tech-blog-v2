// Function that handles the logout functionality.
// When user clicks on 'logout' button (in 'main.handlebars'), this function will be triggered:
const logout = async () => {
    // Sends a POST request to '/api/users/logout' endpoint on the server.
    // This api route is responsible for logging out the user.
    // 'await' keyword waits for a response from the server:
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
    });

    // If logout is successful, user is redirected to the '/login' page:
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Failed to log out.');
    }
};

// Line selects HTML element with '#logout' ID and attaches an event listener to it.
// When the element is clicked, the logout function is executed:
document
    .querySelector('#logout')
    .addEventListener('click', logout);