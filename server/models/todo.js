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
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,

        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true,
        isNextDay: function (value){
          const currentYear = new Date().getFullYear()
          const currentMonth = new Date().getMonth()
          const currentDate = new Date().getDate()

          if(
          value.getFullYear() < currentYear ||
          (value.getFullYear() === currentYear && value.getMonth() < currentMonth) ||
          (value.getFullYear() === currentYear && value.getMonth() === currentMonth && value.getDate() < currentDate )
          ){
            throw 'Cannot input past day in due_date parameter'
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};