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
      User.hasMany(models.UserBrewery)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
      validate: {
        isMinimumSixChar (value) {
          if(value.length < 6) {
            throw new Error('Password must be minimum 6 characters')
          }
        }
      }
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