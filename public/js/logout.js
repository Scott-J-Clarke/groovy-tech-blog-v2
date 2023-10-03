const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
    });

    // If logout is successful, user is redirected to homepage ('/'):
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
};

document.querySelector('#logout').addEventListener('click', logout);
    