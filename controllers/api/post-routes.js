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

//Creating a route to find specific data of the post  
router.get('/:id',(req,res)=>{ 
    User.findOne({ 
        attributes:['"id","title","body","user_id"'], 

        where:{ 
            id:req.params.id 
        }, 
        include:[ 
            { 
                model:User,  
                attributes:["username"]
            }, 
            { 
                model:Comment,  
                attributes:["id","user_id",'comment_text'], 
                include: { 
                    model:User, 
                    attributes:['username']
                }
            }, 
            
        ]
    }) 
    .then(UserData =>{  
        if(!UserData){ 
            res.status(404).json({message:'Sorry this post has no id'}); 
            return;
        }
        res.json(UserData);

    }) 
    .catch(err =>{ 
        console.log(err); 
        res.status(500).json(err);
    });
});  

//Creating route to delete post 

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const [obscureRows] = Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if ( obscureRows> 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  