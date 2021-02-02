'use strict';
const { hashPassword } = require('../helpers/bcrypt.js');
const {
  Model
} = require('sequelize');
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
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      },
      unique: {
        args: true,
        msg: 'This email has been used'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot be empty'
        },
        notNull: { // khusus untuk null
          msg: "password cannot be empty"
        },
        len: {
          args: [6,30],
          msg: 'minimum password length is 6 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashPassword(user.password) ;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};