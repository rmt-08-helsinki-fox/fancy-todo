'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ToDo.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  };
  ToDo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'title tidak boleh kosong'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'description tidak boleh kosong'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        dueDate(value) {
          // console.log(value);
          if (value > new Date()) {
            //masih besoknya
            // console.log('benar');
          } else {
            //lewat hari ini
            throw new Error('Due Date jangan lewat dari hari ini')
            // console.log('salah');
          }
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.status = false
      }
    },
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};