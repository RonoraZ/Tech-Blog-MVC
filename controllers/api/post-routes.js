const router = require('express').Router();
const { includes } = require('lodash');
const { userInfo } = require('os');
const { Post,User,Comment } = require('../../models/');
const withAuth = require('../../utils/auth'); 

//Creating a route that gets all the post 

router.get('/',(req,res)=>{ 
    console.log('======================');
    Post.findAll({ 
        attributes:["id","title","fufilled"], 
        // order:[['DESC']], 
        include:[ { 
           model:User,
            attributes:['userName'] 

        }, 
        { 
            model:Comment,
            attributes:['id','commentText','postID','userID'], 
            include:{ 
                model:User, 
                attributes:['userName']
            }
        }
    ]
    }) 
    .then(PostData => res.json(PostData))
    .catch(err =>{ 
        console.log(err); 
        res.status(500).json(err);
    });
}); 

//Creating a route to find specific data of the post  
router.get('/:id',(req,res)=>{ 
    User.findOne({ 
        attributes:["id","title","fufilled"], 

        where:{ 
            id:req.params.id 
        }, 
        include:[ 
            { 
                model:User,  
                attributes:["userName"]
            }, 
            { 
                model:Comment,  
                attributes:["id","userID",'commentText'], 
                include: { 
                    model:User, 
                    attributes:['userName']
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

  router.post('/', withAuth, (req, res) => {
    // creates a new Post model instance and calls save on it
    console.log(req.body);
    Post.create({
            
            title: req.body.title,
            fufilled: req.body.fufilled, 
             userID: req.session.userID
        })
        .then(PostData => res.json(PostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); 

//Updating the post id data . When its clicked user will be given a new one 

router.put('/:id', withAuth, (req, res) => {
    
        Post.update({

                title: req.body.title,
                fufilled: req.body.fufilled
            }, {
    
                where: {
                    id: req.params.id
                }
            }).then(PostData => {
                if (!PostData) {
                    res.status(404).json({ message: 'Sorry no post found with this id' });
                    return;
                }
                res.json(PostData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });
  
  module.exports = router;
  