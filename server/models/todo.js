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
          msg: "title cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "description cannot be empty"
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate(todo){
        todo.status = false
      }
    }
  });
  return Todo;
};