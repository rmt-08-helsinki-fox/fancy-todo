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
      type : DataTypes.STRING,
      validate : {
        notEmpty:{
          args : true,
          msg : 'Title cannot be Empty'
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate:{
        notEmpty:{
          args : true,
          msg : 'Description cannot be Empty'
        }  
      }
    },
    status: {
      type : DataTypes.BOOLEAN,
      validate :{
        notEmpty :{
          args : true,
          msg : 'Status cannot be Empty'
        }
      }
    },
    due_date : {
      type: DataTypes.DATE,
      validate:{
        isAfter:{
          args : new Date().toISOString(),
          msg : "Must be Today and Tomorrow"
        },
        notEmpty:{
          args : true,
          msg : "Must Be Date Format"
        }
      },
    },
    UserId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
    hooks:{
      beforeCreate(instance,option){
        instance.status = false
      }
    }
  });
  return Todo;
};