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
        notEmpty:{
          args: true,
          msg: 'title is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: 'description is required'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty:{
          args: true,
          msg: 'status is required'
        }
      }
    },
    due_date:{
      type: DataTypes.DATE,
      validate:{
        isAfter:{
          args: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
          msg: 'Date Must Be After Today'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};