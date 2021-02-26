'use strict';
const {
  Model
} = require('sequelize');

const { hashPass } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: 'UserId', sourceKey: 'id'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Please enter your email'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      is: /^[0-9a-f]{64}$/i,
      validate: {
        notEmpty: {
          msg: 'Please enter your password'
        }
      }
    },
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter your full name'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter your city'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        user.password = hashPass(user.password)
        user.city = 'Jakarta'
      }
    }
  });
  return User;
};