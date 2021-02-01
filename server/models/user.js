'use strict';
const {
  Model
} = require('sequelize');
const {makeHash} = require('../helpers/bcrypt')
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
      validate: {
        isEmail: {
          args: true,
          msg: 'invalid email format'
        }
      },
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(user, options) {
        user.password = makeHash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};