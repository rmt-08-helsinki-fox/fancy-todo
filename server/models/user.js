'use strict';
const {
  Model
} = require('sequelize');

const {genPass} = require('../helpers/bcrypt')

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
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: "username cannot be empty"
        },
        len: {
          args: [5,20],
          msg: "Your username must be 5-20 characters long"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{
          args: true,
          msg: "Invalid email format"
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args:  true,
          msg: "Password cannot be empty"
        },
        len: {
          args: [5,20],
          msg: "Your password must be 5-20 characters long"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: user => {
        user.password = genPass(user.password)
      }
    }
  });
  return User;
};