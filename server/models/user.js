'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helper/bcrypt')
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
      validate: {
        notEmpty: {
          args: true,
          msg: `Email is required`
        },
        isEmail: {
          args: true,
          msg: `Invalid email format`
        },
        notNull: {
          msg: `Email is required field`
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password is required`
        },
        notNull: {
          msg: `Password is required field`
        }
      }
    }

  }, {
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashing(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};