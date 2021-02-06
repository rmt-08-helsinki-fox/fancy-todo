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
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg : 'Title cannot be empty'
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Description cannot be empty'
        }
      }
    },
    status: {
      type :DataTypes.BOOLEAN,
      validate:{
        notEmpty:{
          msg: 'Status cannot be empty'
        },

      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate:{
        notEmpty:{
          msg : 'Date cannot be empty'
        },
        isAfter:{
          args : new Date().toString(),
          msg : 'Please fill the Date Greater than Today'
        }
      }
    },
    UserId:{
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: 'UserId cannot be empty'
        }
      }
      
    }
  }, {
    sequelize,
    modelName: 'Todo',
    hooks:{
      beforeCreate(instance){
        !instance.status ? instance.status = false : '' 
      }
    }
  });
  return Todo;
};