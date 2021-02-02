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
        notEmpty: {
          args: true,
          msg: 'title cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'status cannot be empty'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isToday(value) {
          let now = new Date()
          let nowDay = +now.toLocaleString()[2]
          let nowMonth = +now.toLocaleString()[0]
          let nowYear = +now.toLocaleString().substring(0, 8).slice(4)

          let dalueDay = +value.toLocaleString()[2]
          let valueMonth = +value.toLocaleString()[0]
          let valueYear = +value.toLocaleString().substring(0, 8).slice(4) 

          if(valueYear < nowYear || valueMonth < nowMonth || dalueDay < nowDay) {
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