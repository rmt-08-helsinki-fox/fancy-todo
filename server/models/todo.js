'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');
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
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        },
        notNull: {
          msg: 'Title is required'
        }
      }
    },
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: { 
        isAfter: {
          args: moment(new Date()).subtract(1, 'days').toString(),
          msg: `Date must be greater than yesterday`
        }
      }
    },
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate: (todo, options) => {
        !todo.status ? todo.status = false : {}
      },
      beforeUpdate: (todo, options) => {
        !todo.status ? todo.status = false : {}
      }
    }
  });
  return Todo;
};