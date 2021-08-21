//Making this function to be compatible with adding a post format 

 const  response  = ("response");

async function latestDeviceHandler(event){ 
    event.preventDefault(); 

    //Adding the values that are needed for the form add-post 

    const title = document.querySelector('input[name="titleAdd"]').value  
    const fufilled = document.querySelector('textArea[name="fufilled"]').value 

    //Adding string data to the post-routes 

    const reply = await fetch(`/api/post`,{ 
    method:"POST", 
    body: JSON.stringify({ 
        title,fufilled
    }), 
    headers:{ 
        'Content-Type':'application/json'
    }
    }); 

    //If everything is received correctly it will return you to the dashboard 

    if(response.ok){ 
    document.location.replace('/dashboard'); 

    }else{ 
    alert(response.statusText);
    }
}; 

document.querySelector('#add-formB').addEventListener('submit',latestDeviceHandler);


