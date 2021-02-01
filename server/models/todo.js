'use strict';
const {
  Model
} = require('sequelize');
const { yesterdayGen } = require("../helpers/yesterday-generator")
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
  };
  Todo.init({
    title:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "title should not be empty"}
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "description should not be empty"}
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {msg: "status should not be empty"},
        isIn: {
          args:[['true', 'false']],
          msg: "status should be either 'true' or 'false'"}

      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {msg: "date should not be empty"},
        isAfter: {
          args: `${yesterdayGen()}`,
          msg: "cannot input past date"
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};