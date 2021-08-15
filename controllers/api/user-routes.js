//Importing routes and required model files 

const router = require('express').Router 

const{User} = require('../../models') 

//Creating a route that will get the data of the user besides his password 

router.get('/',(req,res)=>{ 
    User.findAll({ 
        attributes:{prohibit:['[password]']}
    }) 
    .then(UserData => res.json(UserData))
    .catch(err =>{ 
        console.log(err); 
        res.status(500).json(err);
    });
}); 

//Creating a route that will get an user info with an id minuse password 

router.get('/:id',(req,res)=>{ 
    User.findOne({ 
        attributes:{prohibit:['[password]']}, 

        where:{ 
            id:req.params.id 
        }, 
        include:[ 
            { 
                model:Post,  
                attributes:["id","title","body","user_id"]
            }, 
            { 
                model:Comment,  
                attributes:["id","user_id",'comment_text'], 
                include: { 
                    model:Post, 
                    attributes:['title']
                }
            }, 
            { 
                    model:Post, 
                    attributes:['title'],
                
            },
        ]
    }) 
    .then(UserData =>{  
        if(!UserData){ 
            res.status(404).json({message:'Sorry this user has no id'}); 
            return;
        }
        res.json(UserData);

    }) 
    .catch(err =>{ 
        console.log(err); 
        res.status(500).json(err);
    });
}); 

//Creating a route in order to use a username and password in order to access the data . 

router.post('/', async (req, res) => {
    try {
      const latestUser = await User.create({
        username: req.body.username,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.userID = latestUser.id;
        req.session.userName = latestUser.username;
        req.session.loggedIn = true;
  
        res.json(newUser);
      });
    } catch (err) {
      res.status(500).json(err);
    }
}); 

/*Creating a route when a user presses the log in button 
it will find their user username that belongs to them */

router.post('/login',(req,res)=>{ 
    User.findOne({ 
        where:{ 
            username: req.body.username
        }
    }) 
    .then(UserData=>{ 
        if(!UserData){ 
            res.status(400).json({message:'Sorry this username is not valid for this user'})
            return;
        } 
        const truePassword = UserData.inspectPassword(req.body.password); 
        if(!truePassword){ 
            res.status(400).json({message:'Sorry wrong password'})
            return;
        } 
        //Implementing requirements in order to save once data 
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;
      
            res.json({ user, message: 'You are now logged in!' });
          
        }); 
        
        
    })
    .catch (err=>{ 
        console.log(err)
        res.status(400).json({message:'No user was found!'});
    })
});

//Destroys the session when the user logsout  
router.post('/login',(req,res)=>{ 
    if(req.session.loggedIn){ 
        req.session.destroy(()=>{ 
            res.status(204).end();
        });
    }
}) 

module.exports = router;
