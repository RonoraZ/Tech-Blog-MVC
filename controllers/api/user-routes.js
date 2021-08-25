//Importing routes and required model files 

const router = require('express').Router();

const{User,Post,Comment} = require('../../models')  

const withAuth = require('../../utils/auth');

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
        attributes:{exclude:['[password]']}, 

        where:{ 
            id:req.params.id 
        }, 
        include:[ 
            { 
                model:Post,  
                attributes:["id","title","fufilled",]
            }, 
            { 
                model:Comment,  
                attributes:['id','commentText','postID','userID',], 
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
    console.log(typeof req.body);
    try {
      const latestUser = await User.create({
        userName: req.body.username,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.userID = latestUser.id;
        req.session.userName = latestUser.userName;
        req.session.loggedIn = true;
  
        res.json(latestUser);
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
            userName: req.body.user
        }
    }) 
    .then(UserData=>{ 
        if(!UserData){ 
            res.status(400).json({message:'Sorry this username is not valid for this user'})
            return;
        } 
        const truePassword = UserData.checkPassword(req.body.pass); 
        if(!truePassword){ 
            res.status(400).json({message:'Sorry wrong password'})
            return;
        } 
        //Implementing requirements in order to save once data 
        req.session.save(() => {
            req.session.userId = UserData.id;
            req.session.userName = UserData.userName;
            req.session.loggedIn = true;
      
            res.json({ UserData, message: 'You are now logged in!' });
          
        }); 
        
        
    })
    .catch (err=>{ 
        console.log(err)
        res.status(400).json({message:'No user was found!'});
    })
});

//Destroys the session when the user logsout  
router.post('/logout',(req,res)=>{ 
    if(req.session.loggedIn){ 
        req.session.destroy(()=>{ 
            res.status(204).end();
        });
    }
}) 

module.exports = router;
