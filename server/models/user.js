'use strict';
const {
  Model
} = require('sequelize');
const { hashText } = require('../helpers/bcrypt')


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo, { foreignKey: 'userId', sourceKey: 'id' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid format email"
        }
      },
      unique: {
        args: true,
        msg: "email sudah terdaftar, silahkan gunakan email yang lain."
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        user.password = hashText(user.password)
      }
    }
  });
  return User;
};