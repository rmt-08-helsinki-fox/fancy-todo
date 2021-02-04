'use strict';
const { hash } = require("../helpers/bcrypt")
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
      this.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        isEmail: {
          args: true,
          msg: 'Email must be valid'
        }
      },
      unique: {
        args: true,
        msg: 'Email has been used'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /[A-Za-z\d]{8,}/,
          msg: 'Password must contain minimum 8 characters'
        },
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        }
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(value) {
        value.password = hash(value.password)
      }
    }
  });
  return User;
};