'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TodoMember.init({
    todo_id: DataTypes.INTEGER,
    member_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TodoMember',
  });
  return TodoMember;
};