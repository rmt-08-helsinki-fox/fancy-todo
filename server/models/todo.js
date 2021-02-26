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
      Todo.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title cannot be empty'
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
          args: true,
          msg: 'status cannot be empty'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: new Date().toString(),
          msg: 'Date must be greater than today'
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Todo'
  });
  return Todo;
};