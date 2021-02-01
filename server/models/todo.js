'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // todo.belongsTo(models.user, {foreignKey: 'UserId'})
    }
  };
  todo.init({
    title: { 
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'tittle is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    status: {
      type:DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: 'Status is required'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Date is required'
        },
        isAfter: {
          args: new Date().toString(),
          msg: 'must be greater or equal than today'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate (instance, option) {
        instance.status = false
      }
    },
    sequelize,
    modelName: 'todo',
  });
  return todo;
};