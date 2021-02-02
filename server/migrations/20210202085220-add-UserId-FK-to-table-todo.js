'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Todos", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Todos", "UserId")
  }
};
