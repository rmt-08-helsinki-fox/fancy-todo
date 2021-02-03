"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Todo.belongsTo(models.User)
		}
	}
	Todo.init(
		{
			title: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						args: true,
						msg: "Title Cannot Be Empty",
					},
				},
			},
			description: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						args: true,
						msg: "Title Cannot Be Empty",
					},
				},
			},
			status: DataTypes.BOOLEAN,
			due_date: {
				type: DataTypes.DATEONLY,
				validate: {
					notEmpty: {
						args: true,
						msg: "Date Cannot Be Empty",
					},
					isDate: {
						args: true,
						msg: "Date Format False",
					},
					isAfter: {
						args: new Date().toISOString(),
						msg: "You Cannot Input Date Before Now",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Todo",
			hooks: {
				beforeCreate: (instance, option) => {
					instance.status = false;
				},
			},
		}
	);
	return Todo;
};
