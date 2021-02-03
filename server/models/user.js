const {encrypt} = require('../helper/bcrypt')
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {foreignKey : "UserId"})
    }
  };
  User.init({
    email: {
     type: DataTypes.STRING,
     unique: {
      args: true,
      msg : "Email has been used"
    },
     validate: {
       isEmail: true,
       notEmpty: true,
     }
     
    },
    password: {
     type: DataTypes.STRING,
     validate:{
       notEmpty: true
     }
    },
  }, {
    hooks:{
      beforeCreate:(user,option)=>{
        user.password = encrypt(user.password)
        // console.log("dalem hooks");
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};