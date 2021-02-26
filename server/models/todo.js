'use strict';
const {
  Model
} = require('sequelize');

let yesterday = require('../helpers/date')

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
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'title is required field'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type : DataTypes.DATE,
      validate : {
        isAfter : {
          args : yesterday,
          msg : 'Date must be at least today'       
        }
      }
    }
  }, {
    hooks : {
      beforeCreate : function(user, opt){
        user.status = false
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};