'use strict';
const {
  Model
} = require('sequelize');

const {hashPassword} = require("../helpers/bcrypt")
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
      allowNull: false,
      unique: {
        args: true,
        msg : `Email has been used!`
      },
      validate: {
        isEmail: {
          args: true,
          msg: `Invalid Email`
        },
        notNull: {
          msg : `Email cant be empty`
        }
      },
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};