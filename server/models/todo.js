'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isBefore(due_date) {
          let dateNow = new Date().toISOString().slice(0, 10);
          if(due_date.getTime() < new Date(dateNow).getTime()) {
            throw new Error("set to yesterday is not allowed");
          }
        }
      }
  }}, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};

