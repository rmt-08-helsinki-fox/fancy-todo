'use strict';
const {
  Model
} = require('sequelize');

const {hasspass} = require('../helper/bcrypt');
const { options } = require('../routes');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo,{
        foreignKey: "UserId"
      })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
       validate:{
         notEmpty:{
           args:true,
           msg:"name must be filled , u dont have a name dumbass!??"
         },
         isAlpha:{
           args:true,
           msg:"name must alphabetic character character"
         }
       }
    
    },
    email: {
      type:DataTypes.STRING,
      unique: true,
      validate:{
        isEmail:{
          args:true,
          msg:"Input must be in email format (e.g abcd@mail.com)"
        }
      }        
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args: [6],
          msg: "Password must be more than 6 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate:(user,options) =>{
        user.password = hasspass(user.password)
      }
    }
  });
  return User;
};