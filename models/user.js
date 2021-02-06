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
      User.hasMany(models.Todo)
    }
  };
  User.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Name is required'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args: true,
          msg: 'Invalid email format'
        }
      }, 
      unique: {
        args: true,
        msg: 'Email already exist'
      }
    },
    username: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args: true,
          msg: 'Username is required'
        }
      },
      unique: {
        args: true,
        msg: 'Username already exist'
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Password is required'
        }
      }
    },
    role: {
      type : DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (user, opt) => {
        user.password = hashPass(user.password)
        user.role = 'user'
      }
    }
  });
  return User;
};