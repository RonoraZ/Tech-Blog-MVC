//const { title } = require('process');
const {  Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

//Creating a post model 
class Post extends Model {} 

Post.init({ 
    id:{ 
        type:DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
     
    }, 
    title:{ 
        type:DataTypes.STRING, 
        allowNull:false, 
       
    },  

    fufilled:{ 
        type:DataTypes.STRING, 
        allowNull:false, 
       
    }, 
    userID:{ 
        type:DataTypes.INTEGER, 
        //allowNull:false, 
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

     module.exports=Post;