'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt.js');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ToDo, { foreignKey: 'user_id' });
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Input a valid email format"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Email cannot be empty"
        }
      },
      unique: {
        args: true,
        msg: "Email already taken"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLongEnough(value){
          if(value.length < 6) {
            throw new Error('Minimum password is 6 character')
          } 
        },
        notEmpty: {
          args: true,
          msg: "Password cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Password cannot be empty"
        }
      }
    },
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashPass(user.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};