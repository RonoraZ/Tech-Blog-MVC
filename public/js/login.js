 

 async function loginH(event) {
    event.preventDefault();
    console.log("Run")
  
    const username = document.querySelector('#usernameLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim(); 
    
  
    if (username && password) {
      const reply = await fetch('/api/user/login', {
        method: 'post',
        body: JSON.stringify({
          user:username,
          pass:password
        }),
        headers: { 'Content-Type': 'application/json' }
      }).catch(err =>{ 
        console.log(err);
      })
       
      if (reply.ok) { alert("Logged IN !!!")
        document.location.replace('/dashboard');
      } else {
        alert(reply.statusText);
      }
    }
  }
  

document.querySelector('#loginForm').addEventListener('submit',loginH)


