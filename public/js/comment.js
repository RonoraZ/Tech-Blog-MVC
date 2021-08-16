//Making a function to return a single post from the 
//post_id.That way when a comment is posted one can get that 
//data in return from the data base . 

async function commentPlacement(event) {
    event.preventDefault();

    const commentText = document.querySelector('input[name="commentPlace"]').value.trim();

    const postID = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
            document.querySelector('#commentFormes').style.display = "block";
        }
    }
}

document.querySelector('.commentFormes').addEventListener('submit', commentPlacement);

