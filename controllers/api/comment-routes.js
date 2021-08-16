const router = require('express').Router();
// const { json } = require('body-parser');
// const { join } = require('path/posix');
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');  

//Creating a route in order to get comment and be displayed 

router.get('/',(req,res)=>{ 
    Comment.findAll({}) 
    .then(CommentData => res.json(CommentData)) 
    .catch(err=>{ 
        console.log(err); 
        res.status(500).json(err);
    })
}); 

//Creating a route in order to view and post new comments 

router.post('/', withAuth, async (req, res) => {
    try {
      const upToDateComment = await Comment.create({
        ...req.body,
        userId: req.session.userId,
      });
      res.json(upToDateComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;

