//Making this function to be compatible with adding a post format 

const { response } = require("express");

async function latestDeviceHandler(event){ 
    event.blockDefault(); 

    //Adding the values that are needed for the form add-post 

    const title = document.querySelector('input[name="titleAdd"]').value  
    const body1 = document.querySelector('textArea[name="body"]').value 

    //Adding string data to the post-routes 

    const reply = await fetch(`/api/post`,{ 
    method:"POST", 
    body: JSON.stringify({ 
        title,body1
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
} 


