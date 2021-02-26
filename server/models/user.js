'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Username is required field'
        },
        len: {
          args: [6],
          msg: 'Username minimum 6 characters'
        }
      },
      unique: true
    },
    email: {
      type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Email is required field'
      },
      isEmail: {
        msg: 'Email not valid'
      }
    },
    unique: true
  },
    password: {type: 
      DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Password is required field'
      },
      len: {
        args: [6],
        msg: 'Password minimum 6 character'
      }
    }
  }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};