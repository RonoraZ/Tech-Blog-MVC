const sequelize = require('../config/config.js'); 
const {Post, User, Comment} = require('../models'); 
const router = require('express').Router();  
const withAuth = require('../utils/auth.js');  
const { route } = require('./home-routes.js');


router.get('/',withAuth,(re,res)=>{ 
    Post.findAll({ 
        where:{ 
            user_id: req.session.user_id
        }, 

        attributes:["id","title","fufilled","made_in"], 
        incldue:[ 
            { 
                model:Comment, 
                attributes:['id','commentText','postID','userID','made_in'], 
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
        res.render('dashboard',{posts,loggedIn: true});
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
        attributes:["id","title","fufilled","made_in"], 
        include:[ 
            { 
                model:User, 
                as:"user", 
                attributes:["userName"]
            }, 
            { 
                model:Comment, 
                as:"comments", 
                attributes:['id','commentText','postID','userID','made_in']
            },
        ]
    }) 
     
    .then(PostData =>{  
        if(!PostData){ 
            res.status(404).json({message:'Sorry this post has no id'}); 
            return;
        }
        const post = PostData.map(post=>post.get({plain:true})); 

        console.log(post);  

        res.render('editPost',{post,loggedIn:req.session.loggedIn});

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