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
          msg: 'title must not empty'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate :{
        notEmpty : {
          args: true,
          msg: "status must not empty"
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isTomorrow(value) {
          const date = new Date(value)
          const now = new Date()
          if(date < now) {
            throw new Error("Date Must be grather than today")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};