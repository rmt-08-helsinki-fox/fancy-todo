'use strict';
const {
  Model
} = require('sequelize');

const { createHash } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: 'user_id' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: `Invalid email format` }
      },
      // somehow unique gak keterima
      unique: {
        msg: `User with ${User.email} already exist!`
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        validation (password) {
          const errMsg = [
            `Password cannot be empty`,
            `Password must be at least 8 characters`,
            `Password must contain at least one number one upper case and one symbol`
          ];

          const symbol = /^[A-Za-z0-9 ]+$/.test(password);
          const number = /\d+/.test(password);
          let upperCase = 0;

          const arr = password.split('');
          arr.forEach(el => {
            if (isNaN(el)) if (el.toUpperCase() == el && el.toLowerCase() != el) upperCase++;
          });

          if (!password) throw new Error (errMsg[0]);
          else if (password.length < 8) throw new Error (errMsg[1]);
          else if (symbol) throw new Error (errMsg[2]);
          else if (!number) throw new Error (errMsg[2]);
          else if (!upperCase) throw new Error (errMsg[2]);
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        let hash = createHash(user.password);
        user.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};