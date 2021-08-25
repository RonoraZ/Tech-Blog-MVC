 //Creating a function in order to able to delete a post 

 async function deleteM(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      
      const reply = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          postID: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (reply.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(reply.statusText);
      }
      
}

document.querySelector('.deletePost-btn').addEventListener('click', deleteM);