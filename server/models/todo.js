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
      Todo.belongsTo(models.User, {foreignKey: 'user_id'})
    }
  };
  Todo.init({
    title: {
     type: DataTypes.STRING,
     validate:{
       notEmpty: {
         args: true,
         msg: 'Title cannot be empty'
       }
     }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          args: true,
          msg: 'Description cannot be empty'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter(dateFromClient){
          let currentDate = new Date().toISOString().substr(0, 10)
          let parsedDate = dateFromClient.toISOString().substr(0, 10)
          if(parsedDate < currentDate){
            throw new Error('Invalid Date') 
          }
        }
      }
    },
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate(instance, options){
        instance.status = false
      }
    }
  });
  return Todo;
};