const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

//Creating a comment model 
class Comment extends Model {} 

Comment.init({ 
    id:{ 
        type:DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    }, 
    commentText:{ 
        type:DataTypes.INTEGER, 
        Validate:{len:[3]}
    
    }, 
    userID:{ 
        type:DataTypes.INTEGER, 
        allowNull:false, 
        reference:{ 
            model:'user', 
            key:'id'
        }
    }, 
    postID:{ 
        type:DataTypes.INTEGER, 
        allowNull:false, 
        reference:{ 
            model:'post', 
            key:'id'
        }
    }, 
    
}, 
    {
    sequelize, 
    modelName:'comment', 
    freezeTableName:true,
    underscored:true
     }); 

module.exports=Comment;