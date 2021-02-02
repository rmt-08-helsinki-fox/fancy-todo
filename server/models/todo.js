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
      ToDo.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  };
  ToDo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Judul tidak boleh kosong"
        },
        notNull: {
          args: true,
          msg: "Judul tidak boleh kosong"
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['done', 'not done']],
          msg: 'Input antara done dan not done'
        },
        notNull: {
          args: true,
          msg: "Status tidak boleh kosong"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: {
          args: new Date().toDateString(),
          msg: "Tanggal harus setelah hari ini dengan format DD-MM-YYYY"
        },
        notNull: {
          args: true,
          msg: "Tanggal tidak boleh kosong"
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};