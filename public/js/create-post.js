const postFormHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#post-title').value.trim();
    const postContent = document.querySelector('#post-content').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ postTitle, postContent }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', postFormHandler);
