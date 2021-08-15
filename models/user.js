const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//Creating a post model 
class User extends Model {} 

User.init(  
{ 
    id:{ 
        type:DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true, 
        allowNull:false
     
    }, 
    username:{ 
        type:DataTypes.TEXT, 
        allowNull:false, 
        unique:true, 
       
    }, 
    password:{ 
        type:DataTypes.INTEGER, 
        allowNull:false, 
        validate:{ 
            len:[8]
            
        }
    }, 
}, 
//Using hooks in order for the user password be secured   
{ 
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        }
    },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'User'
    
}
); 

module.exports = User;