const User = require('./user');
const Post = require('./post');
const Comment = require('./comment'); 
//const { belongsTo } = require('./user');

//Creating different models that will use a foreing key to add each attribute .

User.belongsTo(User, {
    foreignKey: 'userID'
  });
  
  Post.belongsTo(User, {
    foreignKey: 'userID',
    onDelete: 'CASCADE'
  });
  
  Comment.belongsTo(User, {
    foreignKey: 'userID',
    onDelete: 'CASCADE'
  }); 

  Comment.belongsTo(Post, {
    foreignKey: 'postID',
    onDelete: 'CASCADE'
  }); 

  User.hasMany(Comment, {
    foreignKey: 'userID',
    onDelete: 'CASCADE'
  }); 

  Post.hasMany(Comment, {
    foreignKey: 'postID',
    onDelete: 'CASCADE'
  });
  
  module.exports = {
    User,
    Comment,
    Post
  };