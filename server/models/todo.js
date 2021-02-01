'use strict';
const {
  Model
} = require('sequelize');
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
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isBefore: new Date()
      }
  }}, {
    hooks: {
      beforeValidate: (todo, option) => {
        console.log(todo.due_date, todo.due_date.getTime() >= new Date().getTime())
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};