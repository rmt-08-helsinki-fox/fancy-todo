'use strict';
const {
  Model
} = require('sequelize');
const formatDate = require('../helpers/formatDate')

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    is_private: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate: (instance, option) => {
        instance.due_date = formatDate(instance.due_date)
      }
    }
  });
  return Todo;
};