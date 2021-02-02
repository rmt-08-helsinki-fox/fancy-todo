'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcrypt')

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
    email: {
      type: DataTypes.STRING,
      notEmpty: {
        args: true,
        msg: 'You must fill the email form'
      },
      unique: {
        args: true,
        msg: 'Email already registered'
      },
      isEmail: {
        args: true,
        msg: 'Must be email format'
      }
    },
    password: {
      type: DataTypes.STRING,
      len: {
        args: 5,
        msg: 'Minimum password length is 5 characters'
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance => {
        instance.password = hash(instance.password)
      })
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};