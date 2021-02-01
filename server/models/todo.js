"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Title cannot be empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description cannot be empty",
          },
        },
      },
      status: DataTypes.BOOLEAN,
      due_date: {
        type: DataTypes.DATE,
        validate: {
          isAfter: {
            args: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            msg: "Due date at least tomorrow",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
