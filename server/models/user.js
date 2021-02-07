'use strict';
const {
  Model
} = require('sequelize');

const {hashPassword} = require('../helpers/bcript')
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
      unique: {
        args:true,
        msg:"email has been registered"
      },
      validate: {
        isEmail: {
          args: true,
          msg : "must format email"
        }
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate : (user,option) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};