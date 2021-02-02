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
      User.hasMany(models.Todo, {foreignKey: 'UserId'})
    }
  };
  User.init({
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Fullname is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Not an email'
        },
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, option){
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};