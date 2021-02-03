"use strict";
const { Model } = require("sequelize");
const {hashPassword} = require("../helpers/bcrypt");

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
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				unique: true,
				validate: {
					notEmpty: {
						args: true,
						msg: "Email Cannot Be Empty",
					},
					isEmail: {
						args: true,
						msg: "Email Format Wrong",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						args: true,
						msg: "Password Cannot Be Empty",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			hooks: {
				beforeCreate: (instance) => {
          instance.password = hashPassword(instance.password);
				},
			},
		}
	);
	return User;
};
