'use strict';
const {hashPassword} = require('../helper/bcrypt')
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
      User.hasMany(models.Todo)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please Insert Username'
        }
      }
    }, 
    email: {
      type:  DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid Email Format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'Password min 6 characters'
        }
      }
    } 
  }, 
  { hooks: {
    beforeCreate: (user, options) => {
      user.password = hashPassword(user.password)
    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};