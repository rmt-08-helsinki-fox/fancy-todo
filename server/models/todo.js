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
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: 'Please insert title'
        }
      }
    }, 
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.STRING,
      validate: {
        dateValidation(value){
          let currentDate = new Date ()
          let inputDate = new Date (value)
          if(currentDate > inputDate) {
            throw new Error ('Date must be greater then today');
          }
        },
        notEmpty: {
          msg: 'Please insert Date'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};