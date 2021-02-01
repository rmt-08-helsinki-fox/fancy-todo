'use strict';
const {
  Model
} = require('sequelize');

const { hash } = require('../helper/hashing');

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
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email has been used'
      },
      validate: {
        notNull: {
          msg: `Email can't be null`
        },
        notEmpty: {
          msg: `Email cant't be empty`
        },
        isEmail: {
          msg: 'Invalid format email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password can't be null`
        },
        notEmpty: {
          msg: `Password can't be empty`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        const password = hash(user.password);
        user.password = password;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};