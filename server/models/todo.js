'use strict';
const moment = require('moment');
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
      Todo.hasOne(models.Food);
      Todo.belongsTo(models.User);

    }
  };
  Todo.init({
    UserId : {
      type : DataTypes.INTEGER,
      references : {
        model : 'Users',
        key : 'id'
      }
    },
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "Please fill title todo"
        },
        notNull : {
          args : true,
          msg : "Please fill title todo"
        }
      }
    },
    description: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "Please fill description todo"
        },
        notNull : {
          args : true,
          msg : "Please fill description todo"
        }
      }
    },
    status: {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "Please fill status todo"
        },
        notNull : {
          args : true,
          msg : "Please fill status todo"
        }
      }
    },
    due_date: {
      type :  DataTypes.DATEONLY,
      allowNull : false,
      validate : {
        isAfter : {
          args : moment().subtract(1, 'days').format('YYYY-MM-DD'),
          msg : "min due date today"
        },
        notEmpty : {
          args : true,
          msg : "Please fill due date todo"
        },
        notNull : {
          args : true,
          msg : "Please fill due date todo"
        }
      }
    }
   
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};