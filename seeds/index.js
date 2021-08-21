const UsersSeeds= require('./userSeeds'); 
const PostsSeeds= require('./postSeeds'); 
const CommentsSeeds = require('./commentSeeds'); 

//let UsersSeeds async ('./userSeeds') 



const sequelize = require('../config/config.js'); 

const plantAll = async() =>{  
    await sequelize.sync({force:true}); 
    await  UsersSeeds(); 
    await PostsSeeds(); 
    await CommentsSeeds();

} 

plantAll();