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
      Todo.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: `Title cannot be empty!` }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: `Desciption cannot be empty!` }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: `Status cannot be empty` }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        validation (date) {
          if (!date) throw new Error (`Due date cannot be empty`);
          else if (date < new Date()) throw new Error (`Due date must be after ${new Date()}`);
        }
      }
    },
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};