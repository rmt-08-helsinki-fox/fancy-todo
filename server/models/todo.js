"use strict";
const { Model } = require("sequelize");
const dateFormater = require("../helpers/dateFormater");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User);
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Title must be filled",
          },
        },
      },
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      due_date: {
        type: DataTypes.DATE,
        validate: {
          isAfter: {
            args: dateFormater(),
            msg: "Date must be after this day",
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
