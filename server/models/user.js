'use strict';
const {
  Model
} = require('sequelize');

const {hasPassword, hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {foreignKey: 'UserId', sourceKey: 'id'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      },
      unique: {
        args: true,
        msg: 'Email has been used'
      }
    },
    password: {
      type: DataTypes.STRING,
      is: /^[0-9a-f]{64}$/i,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter your strong password'
        },
        len: {
          args: [6,64],
          msg: 'Please enter your strong password'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashPassword(user.password)
      },
    }
  });
  return User;
};