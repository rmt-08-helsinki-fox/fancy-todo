'use strict';

const { hashPassword } = require('../helpers/bcrypt') 

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
      type:DataTypes.STRING, 
      validate: {
        isEmail: {
          args: true,
          msg: 'must be an email'
        },
        notEmpty: {
          args: true,
          msg: 'email cannot be empty'
        }
      }
    },
    password: {
      type:DataTypes.STRING, 
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot be empty'
        },
        len: {
          args: [6],
          msg: 'password minimum length is 6 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};