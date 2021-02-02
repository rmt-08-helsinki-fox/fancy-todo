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
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email cannot empty'
        },
        isEmail: {
          args: true,
          msg: 'Must be email format'
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
        len: {
          args: [5],
          msg: 'Minimum password length is 5 characters'
        }
      }
    }
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