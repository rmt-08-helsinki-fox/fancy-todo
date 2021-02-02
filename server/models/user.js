'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo, {foreignKey: 'user_id'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true, //jangan lupa di migration kasih constraint juga
      validate:{
        isEmail: {
          args: true,
          msg: "Data harus berupa email!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 16],
          msg: 'Panjang password harus 4 - 16 karakter'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options){
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};