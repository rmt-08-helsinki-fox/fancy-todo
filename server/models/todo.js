"use strict";
const { Model } = require("sequelize");
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
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      due_date: {
        type: DataTypes.DATE,
        validate: {
          dateValidataion() {
            let date = new Date(this.due_date).toLocaleDateString();
            const now = new Date().toLocaleDateString();
            if (date < now) {
              throw new Error("Tidak boleh mengisi tanggal yang sudah lewat");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
