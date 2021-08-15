const router = require('express').Router();
const { includes } = require('lodash');
const { userInfo } = require('os');
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth'); 

//Creating a route that gets all the post 

router.get('/',(res,req)=>{ 
    Post.findAll({ 
        attributes:["id","title","body","user_id"], 
        order:[['user_id',"title"]], 
        include:[ { 
            model:User,
            attributes:['username'] 

        }, 
        { 
            model:Comment,
            attributes:["id","user_id",'comment_text'], 
            include:{ 
                model:User, 
                attributes:['username']
            }
        }
    ]
    }) 
    .then(PostData => res.json(PostData.back()))
    .catch(err =>{ 
        console.log(err); 
        res.status(500).json(err);
    });
});