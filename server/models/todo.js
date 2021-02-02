'use strict';
const {
  Model
} = require('sequelize');

const {getyesterday} = require('../helper/getYesterday')

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User,{
        foreignKey: "UserId"
      })
    }
  };
  Todo.init({
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"title must be filled"
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"description must be filled"
        }
      }
    },
    status: DataTypes.BOOLEAN,
    duedate: {
      type:DataTypes.DATEONLY,
      validate:{
        isAfter:{
          
          args: `${getyesterday()}`,
          msg: "Input must be after today's date"
        },
        isDate:{
          args: true,
          msg: "Input must be in dd-mm-yyyy format"
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