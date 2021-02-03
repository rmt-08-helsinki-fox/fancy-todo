'use strict';
const {
  Model
} = require('sequelize');

const { convert } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.todos, { foreignKey: 'user_id' })
    }
  };
  user.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: `Invalid email format`
        }
      },
      unique: {
        args: true,
        msg: `User with ${user.email} already exist!`
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Password cannot be empty!`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        let hash = convert(user.password);
        user.password = hash;
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};