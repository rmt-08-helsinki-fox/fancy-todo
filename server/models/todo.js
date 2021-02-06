'use strict';
const {
  Model, NOW
} = require('sequelize');
const {formatDate} = require('../helpers/formatDate')

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {foreignKey: 'UserId', targetKey: 'id'})
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        isAfter: {
          args: [formatDate(new Date())],
          msg: "Date must be more then today"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeValidate(instance, option){
        let today = new Date()
        if (instance.due_date <= today.getTime()){
          throw new Error ({msg: "Date must be more then today"})
        }
      },
      beforeCreate(instance, option){
        instance.status = "uncompleted"
      }
    }
  });
  return Todo;
};