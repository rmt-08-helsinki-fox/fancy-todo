'use strict';
const { hashPass } = require("../helper/bcrypt")
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
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate:  {
        notEmpty: {
          msg: "Field email tidak boleh kosong!"
        },
        isEmail: {
          msg: "Format email salah!"
        }
      },
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate:  {
        notEmpty: {
          msg: "Field password tidak boleh kosong!"
        },
        min: {
          args: 6,
          msg: "Password harus terdiri dari 6 karakter atau lebih!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook("beforeCreate", (user, options) => {
    user.password = hashPass(user.password)
  })
  return User;
};