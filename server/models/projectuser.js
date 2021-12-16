'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectUser.belongsTo(models.Project);
      ProjectUser.belongsTo(models.User);
    }
  };
  ProjectUser.init({
    ProjectId: {
      type: DataTypes.INTEGER,
      references : {
        model: 'Projects',
        key: 'id'
      },
    },
    UserId:{
      type: DataTypes.INTEGER,
      references : {
        model: 'Users',
        key: 'id'
      },
    }
  }, {
    sequelize,
    modelName: 'ProjectUser',
  });
  return ProjectUser;
};