'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todos.belongsTo(models.user, { foreignKey: 'user_id' })
    }
  };
  todos.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Title cannot be empty!`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Desciption cannot be empty!`
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Status cannot be empty`
        }
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
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'todos',
  });
  return todos;
};