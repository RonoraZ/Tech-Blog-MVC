/*Creating a function in order for one to be able to edit ones comments in the blog 
by using an async functioni to pass a the promised based behavior in cleaner written way .*/

async function editM(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="titleAdd"]').value.trim();
    const fufilled = document.querySelector('textarea[name="fufilled"]').value.trim();
    console.log(title);
    console.log(fufilled);

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          postID: id,
          title,
          fufilled
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }

}

document.querySelector('.editPost-form').addEventListener('submit', editM);