'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo, { foreignKey: "userId" })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 255],
          msg: "password length min 8 character"
        },
        notEmpty: {
          args: true,
          msg: "insert password"
        },
        isUpperCase(password) {
          if(!password.match(/[A-Z]/g)){
            throw { name: "password error", message: "password must include uppercase", status:400 }
          }
        },
        isLowerCase(password) {
          if(!password.match(/[a-z]/g)){
            throw { name: "password error", message: "password must include lowercase", status:400 }
          }
        },
        isNumeric(password) {
          if(!password.match(/[0-9]/g)){
            throw { name: "password error", message: "password must include numeric", status:400 }
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, opt) {
        user.password = hashPassword(user.password);
      }
    }
  });
  return User;
};