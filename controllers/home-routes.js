//Importing  connection 
const sequelize = require('../config/config.js'); 

//Importing the object from the model files 
const {Post, User, Comment} = require('../models'); 

//Imporitng the express 
const router = require('express').Router(); 

//Creating route to get all post for homepage 

router.get('/',(req,res)=>{ 
    Post.findAll({ 
        attributes:["id","title","body","user_id"], 
        include:[ 
            { 
                model:User, 
                as:"user", 
                attributes:["username"]
            }, 
            { 
                model:Comment, 
                as:"comments", 
                attributes:["id","user_id",'comment_text']
            },
        ]
    }) 
    //Creating a promise in order for the result to be available  
    .then(dbPostData =>{ 
        const post = dbPostData.map(post=>post.get({plain:true}));//Using map helps us serialize all the post . 

        console.log(post);  

        res.render('homepage',{post,loggedIn:req.session.loggedIn});

    }) 
    .catch(err =>{ 
        console.log(err); 
        res.status(500).json(err);
    });
}); 

//Creating a route to direct login to the main page 

router.get('/login',(req,res)=>{ 
    if(req.session.loggedIn){ 
        res.redirect('/'); 
        return;
    } 
    res.render('login');
}); 

//Creating a route to direct signup to the main page  
router.get('/signup',(req,res)=>{ 
    
    res.render('signup');
});  

//Creating a route to server a single post page  

router.get('/post/:id',(req,res)=>{ 
    Post.findOne({ 
        where:{ 
                id:req.params.id
        },
        attributes:["id","title","body","user_id"], 
        include:[ 
            { 
                model:User, 
                as:"user", 
                attributes:["username"]
            }, 
            { 
                model:Comment, 
                as:"comments", 
                attributes:["id","user_id",'comment_text']
            },
        ]
    }) 
     
    .then(dbPostData =>{  
        if(!dbPostData){ 
            res.status(404).json({message:'Sorry this post has no id'}); 
            return;
        }
        const post = dbPostData.map(post=>post.get({plain:true})); 

        console.log(post);  

        res.render('single-post',{post,loggedIn:req.session.loggedIn});

    }) 
    .catch(err =>{ 
        console.log(err); 
        res.status(500).json(err);
    });
});  

module.exports = router;


