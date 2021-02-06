'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTodo extends Model {
    static associate(models) {
      UserTodo.belongsTo(models.User, { foreignKey: "userId" })
      UserTodo.belongsTo(models.Todo, { foreignKey: "todoId" })
    }
  };
  UserTodo.init({
    userId: DataTypes.INTEGER,
    todoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTodo',
    hooks: {
      beforeCreate: (UserTodo, opt) => {
        console.log(UserTodo)
      }
    }
  });
  return UserTodo;
};