'use strict';
const {
  Model
} = require('sequelize');
const todos = require('../routes/todos');
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
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isAfter:{
          args: new Date().toLocaleDateString(),
          msg: 'Due date must greater then today'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo'
  });
  return Todo;
};