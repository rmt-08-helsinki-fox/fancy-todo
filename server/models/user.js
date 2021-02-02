'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt')
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
      allowNull: false,
      unique: {
        args: true,
        msg: 'Duplicated email detected'
      },
      validate:{
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len: {
          args: [6],
          msg: 'Password must be at least 6 characters'
        },
        notEmpty: {
          msg: 'Password is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    },
  });
  return User;
};