'use strict';
const {
  Model, Sequelize
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
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Field title tidak boleh kosong!"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Field description tidak boleh kosong!"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: "Field status tidak boleh kosong!"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        dateValidation(value) {
          const todayDate = new Date().toISOString().split("T")[0]
          const inputedDate = value.toISOString().split("T")[0]
          if (todayDate > inputedDate) {
            throw new Error("Tidak dapat memasukkan tanggal sebelum hari ini!")
          }
        },
        notEmpty: {
          msg: "Field due date tidak boleh kosong!"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Todo'
  });
  return Todo;
};