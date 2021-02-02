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
      User.hasMany(models.Todo, {
        foreignKey: 'user_id',
        targetkey: 'id'
      })
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
      unique: {
        args: true,
        msg: 'Please input another email'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input password'
        },
        min: {
          args: 5,
          msg: 'Password should be 5 character or more'
        }
      }
    }
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