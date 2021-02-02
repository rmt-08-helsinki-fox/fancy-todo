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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean(value) {
          console.log(typeof value)
          if (typeof value !== 'boolean') {
            throw new Error('notBool')
          }
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isLessthanToday(value) {
          let datenow = new Date()
          if (value < datenow) {
            throw new Error("Terlambat");
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};