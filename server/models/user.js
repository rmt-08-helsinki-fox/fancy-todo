"use strict";
const { Model } = require("sequelize");
const { hashing } = require("../helpers/bcrypt");
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
          notEmpty: {
            args: true,
            msg: "Email must be filled",
          },
          isEmail: {
            args: true,
            msg: "Invalid format of email",
          },
        },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: {
            args: 8,
            msg: "Password must be more than 8",
          },
          max: 18,
        },
      },
      location: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Location must be filled",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(instance, opt) {
          instance.password = hashing(instance.password);
        },
      },
    }
  );
  return User;
};
