'use strict';
const {
  Model
} = require('sequelize');

const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.todo, {foreignKey:'UserId', targetKey:'id'})
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      unique:true,
      validate:{
        isEmail:{
          args: true,
          msg: 'invalid format email'
        }
      },
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args: [6],
          msg: "Password must be more than 6 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      },

    }
  });
  return User;
};