'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, { foreignKey: "userId" })
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
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "status required"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isBefore(due_date) {
          let dateNow = new Date().toISOString().slice(0, 10);
          if(due_date.getTime() < new Date(dateNow).getTime()) {
            throw new Error("set to now or yesterday is not allowed");
          }
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};

