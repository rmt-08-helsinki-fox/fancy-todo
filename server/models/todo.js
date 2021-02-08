'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'title is require'}
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'description is require'}
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: { msg: 'due_date is required' },
        checkDate(inputDate) {
          let newDate = new Date()
          if (inputDate < newDate){
            throw new Error('due_date at least tomorrow')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};