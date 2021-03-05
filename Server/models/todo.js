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
      Todo.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Title Can't be Empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Description Can't be Empty`
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        dateNow(value) {
          let input = new Date(value)
          let now = new Date()
          now.setDate(now.getDate() - 1)
          
          if(input <= now){
            throw new Error('Date Input Can not be days that have passed from today')
          }
        },
        notEmpty: {
          args: true,
          msg: `Due Date Can't be Empty`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (todo, options) => {
        todo.status = false
      },
      beforeUpdate: (todo, options) => {
        if(!todo.status){
          todo.status = false
        }
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};