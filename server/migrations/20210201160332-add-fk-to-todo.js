'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Todos', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'custom_fkey_userId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Todos", "custom_fkey_userId", {})
  }
};
