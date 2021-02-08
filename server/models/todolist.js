'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TodoList.belongsTo(models.User)
    }
  };
  TodoList.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
       notEmpty : {
         args : true,
         msg : "data cant be empty"
       }
      }
    },
    due_date: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        isDate : true,
        isAfter : {
          args : new Date().toISOString().split('T')[0],
          msg : "date can't be passed"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TodoList',
  });
  return TodoList;
};