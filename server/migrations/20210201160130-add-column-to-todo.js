'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Todos", "userId", Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Todos", "userId");
  }
};
