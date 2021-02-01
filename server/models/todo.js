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
          msg: "Title is required"
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: "Date format is invalid"
        },
        isAfter: {
          args: new Date(),
          msg: "Due date invalid"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, opt) => {
        if (!instance.status) {
          instance.status === 'open'
        }
        console.log(instance)
      }
    },
    modelName: 'Todo',
  });
  return Todo;
};