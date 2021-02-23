"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn("Todos", "UserId", {
			type: Sequelize.INTEGER,
			reference: {
				model: "Users",
				key: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn("Todos", null, {});
	},
};
