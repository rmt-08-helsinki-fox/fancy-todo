'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.hasMany(models.UserTodo, { foreignKey: "todoId" })
      Todo.belongsToMany(models.User, { through: models.UserTodo, foreignKey: "todoId" })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "title required"
        }
      }
    },
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isNull(due_date) {
          if(due_date === "Invalid Date" || !due_date) {
            throw { name: "Bad Request", message: "Please insert Due Date", status: 400 }
          }
        },
        isBefore(due_date) {
          if(due_date) {
            let dateNow = new Date().toISOString().slice(0, 10);
            if(due_date.getTime() < new Date(dateNow).getTime()) {
              throw { name: "Bad Request", message: "set to now or yesterday is not allowed", status: 400 };
            }
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate(instance, options) {
        instance.status = "incomplete"
      }
    }
  });
  return Todo;
};

