'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ToDo.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id'
      })
    }
  };
  ToDo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: new Date().toLocaleDateString(),
          msg: "Invalid Due Date Input"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (ToDo) => {
        if (!ToDo.status) ToDo.status = false
      }
    },
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};