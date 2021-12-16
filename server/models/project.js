'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsToMany(models.User, { through : models.ProjectUser, as : 'Users' })
      Project.belongsTo(models.User, {as : 'Owner' , foreignKey : 'UserId'})
      Project.hasMany(models.ProjectUser, { as : 'ProjectUsers' });
      Project.hasMany(models.Todo, { as : 'Todos' });
    }
  };
  Project.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : [ 'Please fill project name' ]
        }
      }
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
    modelName: 'Project',
  });
  return Project;
};