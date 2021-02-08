'use strict';
const {
  Model
} = require('sequelize');
const { hashingPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: 'userId' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        },
        notEmpty: {
          msg: 'Email is required'
        }
      },
      unique: {
        msg: 'Email is already registered'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        minLength(value) {
          if (value.length < 6) throw new Error('Password length must be more than 5')
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.email = user.email.toLowerCase()
        user.password = hashingPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};