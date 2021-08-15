const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

//Creating a comment model 
class Comment extends Model {} 

Comment.init({ 
    id:{ 
        type:DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    }, 
    comment_text:{ 
        type:DataTypes.INTEGER, 
        Validate:{len:[3]}
    
    }, 
    user_id:{ 
        type:DataTypes.INTEGER, 
        allowNull:false, 
        reference:{ 
            model:'user', 
            key:'id'
        }
    }, 
    post_id:{ 
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