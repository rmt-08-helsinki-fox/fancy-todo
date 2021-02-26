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
          msg: 'please enter title'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please enter description'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please enter status'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: new Date().toISOString().split('T')[0],
          msg: 'only allow date before a specific date'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};