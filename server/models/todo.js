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
    Todo.belongsTo(models.User, {foreignKey: 'UserId'})
  }
};
Todo.init({
  title: { 
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'tittle is required'
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Description is required'
      }
    }
  },
  status: {
    type:DataTypes.BOOLEAN,
    validate: {
      notEmpty: {
        msg: 'Status is required'
      }
    }
  },
  due_date: {
    type: DataTypes.DATE,
    validate: {
      notEmpty: {
        msg: 'Date is required'
      },
      isAfter: {
        args: new Date().toString(),
        msg: 'Date must be greater or equal than today'
      }
    }
  },
  UserId: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: {
        msg: 'User ID cannot be empty'
      }
    }
  }
}, {
  hooks: {
    beforeCreate (instance, option) {
      instance.status = false
    }
  },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};