'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require('../helpers/bcrypt.js')

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
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
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
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (instance, option) => {
    instance.password = hashingPassword(instance.password)
  })
  return User;
};