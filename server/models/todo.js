'use strict';
const {
  Model
} = require('sequelize');

const { checkDate } = require('../helper/checkDate');

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
      type: DataTypes.DATEONLY,
      validate: {
        checkDueDate(value) {
          let dateValidate = checkDate(value);
          if (dateValidate === 'invalid_format') {
            throw new Error('Invalid date format');
          } else if (dateValidate === 'invalid_due_date') {
            throw new Error(`Due date can't be passed`);
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};