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
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: new Date().toISOString().split('T')[0]
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  // Todo.beforeCreate((todo, option) => {
  //   let due_year = todo.due_date.getFullYear()
  //   let due_month = todo.due_date.getMonth()
  //   let due_date = todo.due_date.getDate()

  //   let now = new Date()

  //   let year = now.getFullYear()
  //   let month = now.getMonth()
  //   let date = now.getDate()

    
  //   if(todo.due_date > new Date()){
  //     throw {msg: 'Due date sudah lewat'}
  //   }else if( due_year===year && due_month===month && due_date===date ){
  //     throw {msg: 'Due date sudah lewat'}
  //   }
  // })
  return Todo;
};