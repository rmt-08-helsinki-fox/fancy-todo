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
      Project.belongsTo(models.User)
    }
  };
  Project.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `title is required`
        },
        notNull: {
          msg: `title is required`
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `url is required`
        },
        notNull: {
          msg: `url is required`
        }
      }
    },
    UserId: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};