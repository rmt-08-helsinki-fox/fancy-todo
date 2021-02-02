'use strict';
const bcrypt = require('bcrypt');
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
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      // unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email name invalid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    hooks:{
      beforeCreate: (async user => {
        try{
          let hash = await bcrypt.hash(user.password, Number(process.env.HASH_SALT))
          user.password = hash
        }catch(err){
          throw {
            name: 'Hashing password failed'
          }
        }
      })
    },
    modelName: 'User',
  });
  return User;
};