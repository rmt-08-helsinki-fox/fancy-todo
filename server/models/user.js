'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'invalid email format'
        },
      },
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true, 
          msg: 'please input your name'
        }
      }
    } ,
    password: {
      type: DataTypes.STRING,
      validate: {
        isLong: function (value){
          if(value.length < 6){
            throw 'six characters are required to make a password'
          }
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function (user, option) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};