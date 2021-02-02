'use strict';
const {
  Model
} = require('sequelize');

const { checkDate } = require('../helper/checkDate');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Title can't be empty`
        },
        notNull: {
          msg: `Title can't be null`
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Status can't be empty`
        },
        notNull: {
          msg: `Status can't be null`
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        checkDueDate(value) {
          let dateValidate = checkDate(value);
          if (dateValidate === 'invalid_format') {
            throw new Error('Invalid date format');
          } else if (dateValidate === 'invalid_due_date') {
            throw new Error(`Due date can't be passed`);
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