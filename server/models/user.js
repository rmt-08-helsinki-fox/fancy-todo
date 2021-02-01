'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helper/bcrypt.js');
const { use } = require('../routes/todo.js');
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
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : "invalid email format"
        }
      },
      unique : {
        args : true,
        msg : "email is already exists"
      }
    },
    password: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate: (user, option) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};