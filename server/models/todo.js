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
        isIn: {
          args:[['true', 'false']],
          msg: "status should not be empty and should be either 'true' or 'false'"}

      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: `${yesterdayGen()}`,
          msg: "date should not be empty and / or past date"
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};