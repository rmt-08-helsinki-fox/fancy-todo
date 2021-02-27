'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const { hashing } = require('../helpers/bcrypt')
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
      allowNull: false,
      unique: {
        msg: 'Email has been used'
      },
      validate: {
        isEmail: {
          msg: 'Invalid email'
        },
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        notNull: {
          msg: 'Password is required'
        },
        len: {
          args: [6,50],
          msg: 'Password minimal 6 characters'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'City is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate : (user, options) => {
        user.password = hashing(user.password);
        !user.city ? user.city = 'Jakarta' : {}
      }
    }
  });
  return User;
};