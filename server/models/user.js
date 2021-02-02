'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helper/bcrypt.js');
const { use } = require('../routes/todo.js');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.TodoList)
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : "invalid email format"
        },
        notEmpty : {
          args : true,
          msg : "email can't be empty"
        }
      },
      unique : {
        args : true,
        msg : "email is already exists"
      }
    },
    password:{
      type : DataTypes.STRING,
      validate : {
        notEmpty :{
          args : true,
          msg : "password cant't be empty"
        }
      }
    },
    username: {
      type : DataTypes.STRING,
      validate : {
        notEmpty :{
          args : true,
          msg : "username cant't be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate: (user, option) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};