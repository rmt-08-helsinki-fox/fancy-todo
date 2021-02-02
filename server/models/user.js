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
      validate: {
        isEmail: {
          args: true,
          msg: "Input email dengan format yang valid"
        }
      },
      unique: {
        args: true,
        msg: "Email sudah digunakan"
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isLongEnough(value){
          if(value.length < 6) {
            throw new Error('Password minimal 6 karakter')
          } 
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