const {hashing} = require("../helpers/bcrypt")

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo,{foreignKey:"UserId"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          args : true,
          msg: "Invalid Email Format",
        }
      },
      unique:true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate:{
        notEmpty:true
      }
    }
  }, {
    hooks:{
      beforeCreate: (user,opt)=>{
        console.log("kesini");
        user.password = hashing(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};