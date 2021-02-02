'use strict';
const {
  Model
} = require('sequelize');

const { hashPass } = require("../helpers/bcrypt")

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
          msg: "Invalid Email"
        }
      },
      unique: {
        args: true,
        msg: "Email already registered"
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 8,
          msg: "Password must at least 8 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};