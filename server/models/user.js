'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: 'UserId',
        sourceKey: 'id'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          args: true,
          msg: 'Email tidak boleh kosong'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email Format'
        }
      },
      unique: {
        args: true,
        msg: 'Your email has been used'
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password tidak boleh kosong'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashing(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};