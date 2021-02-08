'use strict';

const { hashPassword }  = require('../helpers/bcrypt');

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
      User.hasMany(models.Todo);
      User.belongsToMany(models.Project, { through : models.ProjectUser })
    }

  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull : false,
      validate : {
        isEmail : true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : true,
        len : {
          args : [6],
          msg : 'Password min length 6'
        } 
      }
    }
  }, {
    hooks : {
      beforeCreate : (user,options) => {
        user.password = hashPassword(user.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};