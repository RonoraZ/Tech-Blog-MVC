const sequelize = require('../config/config.js'); 
const {Post, User, Comment} = require('../models'); 
const router = require('express').Router();  
const withAuth = require('../utils/auth.js');  
const { route } = require('./home-routes.js');


router.get('/',withAuth,(req,res)=>{ 
    Post.findAll({ 
        where:{ 
            userID: req.session.userID
        }, 

        attributes:["id","title","fufilled"], 
        incldue:[ 
            { 
                model:Comment, 
                attributes:['id','commentText','postID','userID'], 
                incldue:{ 
                    model:User, 
                    attributes:['userName']
                }

            }, 
            { 
                model:User, 
                attributes:['userName']
            }
        ]
    }) 
    .then(PostData =>{ 
        const post = PostData.map(post =>post.get({plain:true})); 
        res.render('dashboard',{post,loggedIn: true});
    }) 
    .catch(err =>{ 
        console.log(err); 
        res.status(500).json(err);
    });
        
}); 

//Creating a route once a user is logged in 

router.get('/edit/:id',withAuth,(req,res)=>{ 
    Post.findOne({ 
        where:{ 
                id:req.params.id
        },
        attributes:["id","title","fufilled",], 
        include:[ 
            { 
                model:User, 
                as:"user", 
                attributes:["userName"]
            }, 
            { 
                model:Comment, 
                as:"comments", 
                attributes:['id','commentText','postID','userID',]
            },
        ]
    }) 
     
    .then(PostData =>{ console.log(PostData);
        if(!PostData){ 
            res.status(404).json({message:'Sorry this post has no id'}); 
            return;
        }
        // const post = PostData.map(post=>post.get({plain:true})); 

        // console.log(post);  

        res.render('edit',{post:PostData,loggedIn:req.session.loggedIn});

    }) 
    .catch(err =>{ 
        console.log(err); 
        res.status(500).json(err);
    });
});   

//Creating a route when click a new post is added to the page 

router.get('/new',(req,res)=>{ 
    res.render('addingPost');
}); 

module.exports =router;