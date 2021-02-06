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
        checkLength(value) {
          if(value.length < 7) {
            throw new Error("Password minimal harus memiliki 6 karakter")
          }
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