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
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "title perlu di isi"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "description perlu di isi"
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE
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