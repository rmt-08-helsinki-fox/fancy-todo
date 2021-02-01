'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // user.hasMany(models.todo, {foreignKey: 'UserId'})
    }
  };
  user.init({
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
    modelName: 'user',
  });
  return user;
};