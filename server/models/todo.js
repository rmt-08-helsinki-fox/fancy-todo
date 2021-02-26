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
          msg: 'Please enter the title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter the description'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please choose the status'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isNull(due_date) {
          if(due_date === "Invalid date" || !due_date) {
            throw { name: "dueDateError", message: "Please choose the due date", status: 400 }
          }
        },
        isBefore(due_date) {
          if(due_date) {
            let dateNow = new Date().toISOString().slice(0, 10);
            if(due_date.getTime() < new Date(dateNow).getTime()) {
              throw { name: "dueDateError", message: "Invalid date", status: 400 };
            }
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};