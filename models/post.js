const { title } = require('process');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

//Creating a post model 
class Post extends Model {} 

Post.init({ 
    id:{ 
        type:DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
     
    }, 
    body:{ 
        type:DataTypes.TEXT, 
        allowNull:false, 
       
    }, 
    user_id:{ 
        type:DataTypes.INTEGER, 
        allowNull:false, 
        reference:{ 
            model:'user', 
            key:'id'
        }
    }, 
}, {
    sequelize, 
    modelName:'post', 
    freezeTableName:true,
    underscored:true
     }); 