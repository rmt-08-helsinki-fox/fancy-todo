'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcrypt')

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
      unique: {
        args: true,
        msg: 'Email already registered'
      },
      isEmail: {
        args: true,
        msg: 'Must be email format'
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance => {
        instance.password = hash(instance.password)
      })
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};