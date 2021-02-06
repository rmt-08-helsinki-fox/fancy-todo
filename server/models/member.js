'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsToMany(models.Todo, { through: models.TodoMember, foreignKey: 'member_id' });
    }
  };
  Member.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'Invalid email format' },
        notEmpty: { msg: `Email can't be empty` }
      }
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};