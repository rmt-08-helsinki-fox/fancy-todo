'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todo.belongsTo(models.User,{foreignKey:'UserId'} )
    }
  };
  todo.init({
    title: {
      type :DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'title tidak boleh kosong'
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'decription tidak boleh kosong'
        }
      }
    },
    status: {
      type:DataTypes.BOOLEAN,
      validate:{
        notEmpty:{
          msg:'status tidak boleh kosong'
        }
      }
    },
    due_date: {
      type:DataTypes.DATEONLY,
      validate: {
        dateNow(value) {
          let input = new Date(value)
          let now = new Date()
          now.setDate(now.getDate() - 1)
          
          if(input <= now){
            throw new Error('Date Input Can not be days that have passed from today')
          }
        }
      }
    }
  }, {        
    sequelize,
    modelName: 'todo',
    hooks:{
      beforeCreate: todo => {
        todo.status = false
        todo.due_date = todo.due_date || new Date()
      }
    }
  });
  return todo;
};