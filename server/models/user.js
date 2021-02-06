"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helper/bcrypt");

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
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
          notEmpty: {
            msg: "Please insert your email",
          },
        },
        unique: {
          args: true,
          msg: "Email already taken",
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Please insert your password",
          },
          is: {
            args: /^(?=.*\d)(?=.*[a-z])[0-9a-z]{8,}$/,
            msg: "Minimum password length is 8 characters and include number",
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate(user, opt) {
          user.password = hash(user.password);
        },
      },
      modelName: "User",
    }
  );
  return User;
};
