'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: 'userId' });
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email address must be valid'
        }
      },
      unique: {
        args: true,
        msg: 'Email already registered'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        requirementPass(value) {
          const regex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,})$/
          if (!value.match(regex)) throw new Error(`Password must contain at least one number, one lowercase alphabet, one uppercase alphabet, and contain a length of at least 6 characters`)
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password);
      }
    }
  });
  return User;
};