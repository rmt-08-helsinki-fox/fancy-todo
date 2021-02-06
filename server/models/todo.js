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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Title is required field`
        },
        notNull: {
          msg: `Title is required`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Description is required field`
        },
        notNull: {
          msg: `Description is required`
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Status is required field`
        },
        notNull: {
          msg: `Status is required`
        },
        isBoolean(value) {
          let boolean = 'true,false'
          if (!boolean.includes(value)) {
            throw new Error(`Status must be boolean true or false`)
          }
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDateNow(value) {
          if (new Date() - value >= 0) {
            throw new Error('Date harus melibihi dari tanggal hari ini')
          } 
        },
        notNull: {
          msg: `due_date is required`
        },
        notEmpty: {
          msg: `due_date is required field`
        }
      }
    }

  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};