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
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isToday(value) {
          let now = new Date()
          let now_day = +now.toLocaleString()[2]
          let now_month = +now.toLocaleString()[0]
          let now_year = +now.toLocaleString().substring(0, 8).slice(4)

          let value_day = +value.toLocaleString()[2]
          let value_month = +value.toLocaleString()[0]
          let value_year = +value.toLocaleString().substring(0, 8).slice(4) 

          if(value_year < now_year || value_month < now_month || value_day < now_day) {
            throw new Error('Cannot input past date')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo'
  });
  return Todo;
};