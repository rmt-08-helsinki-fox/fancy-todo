'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TODO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TODO.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nama task tidak boleh kosong'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Nama task tidak boleh kosong'
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isAfter: {
          args: new Date().toDateString(),
          msg: "Tanggal harus lebih dari hari ini"
        },
        notNull: {
          args: true,
          msg: "Tanggal tidak boleh kosong"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TODO',
  });
  return TODO;
};
