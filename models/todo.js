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
    }
  };
  Todo.init({
    title: { 
      type : DataTypes.STRING, 
      allowNull : false,
      validate : { 
        notEmpty : { 
          args : true, 
          msg : 'title required'
        }, 
        notNull : { 
          args : true, 
          msg : 'title required'
        }
      }
    }, 
    description: { 
      type : DataTypes.STRING, 
      allowNull : false, 
      validate : { 
        notEmpty : { 
          args : true, 
          msg : 'description required'
        }, 
        notNull : { 
          args : true, 
          msg : 'description required'
        }
      }
    }, 
    status: { 
      type : DataTypes.BOOLEAN, 
      allowNull : false, 
      validate : { 
        notNull : { 
          args : true, 
          msg : 'status required'
        }, 
        isIn : { 
          args : [['true','false']], 
          msg : 'Status must be true or false'
        }
      }
    }, 
    due_date: { 
      type : DataTypes.DATE, 
      validate : { 
        isAfter : { 
          args : new Date().toDateString(),
          msg : 'Due_date must be today or after today date' 
        } 
      } 
    } 
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};