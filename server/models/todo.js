'use strict';
const {
  Model
} = require('sequelize');
const validationDate = require('../helpers/validationDate')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Status is required'
        }
      }
    },
    due_date: {
      type: DataTypes.STRING,
      validate: {
        isAfter: {
          args: validationDate(),
          msg: 'the Date has passed'
        },
        notEmpty: {
          msg: 'Due date is required'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER
    },
    priority: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['high', 'medium', 'low']],
          msg: 'priority value must be High, Medium, or Low'
        },
        notEmpty: {
          msg: 'priority is required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (todo, options) => {
        todo.status = 'On Progress'
      },
      afterFind: (todo, options) => {
        if (Array.isArray(todo)) {
          todo.forEach(itm => {
            if (new Date(itm.due_date) >= validationDate()) {
              if (itm.status !== 'Completed') {
                itm.status = 'Expired'
              }
            }
          });
        }
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};