'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require("../helpers/hasher")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {foreignKey: "UserId"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "invalid email format"
        }
      },
      unique: {
        args: true,
        msg: "email already registered"
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "password cannot be empty"},
        len: {
          args: [6],
          msg: "Password must contain minimum six characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        user.password = hash(user.password)
      }
    }
  });
  return User;
};