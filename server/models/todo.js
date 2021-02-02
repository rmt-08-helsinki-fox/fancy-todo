'use strict';
const formatDate = require('../helpers/formatDate.js')
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
      //default foreign key UserId
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { // null masih dianggap valid
          // args: true,  
          msg: 'title cannot be empty'
        },
        notNull: { // khusus untuk null
          msg: "Title cannot be empty"
        }
      }
    },
    
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['todo', 'doing', 'done']],
          msg: 'Choose between todo, doing, or done'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: formatDate(new Date()),
          msg: 'choose date at least today'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};