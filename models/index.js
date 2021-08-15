const User = require('./user');
const Post = require('./post');
const Comment = require('./comment'); 

//Creating different models that will use a foreing key to add each attribute .

User.belongsTo(User, {
    foreignKey: 'user_Id'
  });
  
  Post.belongsTo(User, {
    foreignKey: 'user_Id',
    onDelete: 'CASCADE'
  });
  
  Comment.belongsTo(User, {
    foreignKey: 'user_Id',
    onDelete: 'CASCADE'
  }); 

  Comment.belongsTo(Post, {
    foreignKey: 'post_Id',
    onDelete: 'CASCADE'
  }); 

  User.hasMany(Comment, {
    foreignKey: 'user_Id',
    onDelete: 'CASCADE'
  }); 

  Post.hasMany(Comment, {
    foreignKey: 'post_Id',
    onDelete: 'CASCADE'
  });
  
  module.exports = {
    User,
    Comment,
    Post
  };