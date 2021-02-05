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
      Todo.belongsTo(models.User, {foreignKey : "UserId"})
    }
  };
  Todo.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty:{
          msg : "Title should not be empty"
        },
        notNull:{
          msg : "Title should not be empty"
        }
      }
    },
    description:{
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty:{
          msg : "Description should not be empty"
        },
        notNull:{
          msg : "Description should not be empty"
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        dateCheck(value) {
          if (value < new Date()) {
            throw new Error('Validation errors');
          }
        }
      }
    },
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};