"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
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
          min: 8,
          max: 18,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
