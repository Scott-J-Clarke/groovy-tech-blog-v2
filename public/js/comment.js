async function commentFormHandler(event) {
    event.preventDefault();

    const commentText = document.querySelector('textarea[name="comment-body"]').value.trim();

    // Code takes last part of current URL path and assigns it to variable "postId."
    // "window.location.toString()" returns the curent URL as a string.
    // ".split('/')" splits the URL string into an array of substrings with (/) as the separator.
    // "window.location.toString().split('/').length - 1" gets the index of the last element in the array.
    // The value of the last element in the array is then assigned to the variable "postId."
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (commentText) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                commentText
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        // Checks if the fetch request is successful. If so, reload the current page with "document.location.reload()":
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
