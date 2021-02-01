'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const todos = [
      {
        title: 'Todo 1',
        description: 'Description 1',
        status: false,
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Todo 2',
        description: 'Description 2',
        status: false,
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Todos', todos, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
