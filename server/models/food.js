'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.Todo);
    }
  };
  Food.init({
    foodName: DataTypes.STRING,
    description: DataTypes.TEXT,
    instruction: DataTypes.TEXT,
    image: DataTypes.TEXT,
    TodoId : {
      type : DataTypes.INTEGER,
      references : {
        model : 'Todos',
        key : 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};