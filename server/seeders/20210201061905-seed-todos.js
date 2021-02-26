'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Todos', [
     {
      title: 'Belajar',
      description: 'belajar kelompok, materi: rest api',
      status:'undone',
      due_date: new Date(2020, 1, 8),
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      title: 'Bermain',
      description: 'raid guild ragnarok',
      status:'undone',
      due_date: new Date(2020, 1, 5),
      createdAt: new Date(),
      updatedAt: new Date()
     }
   ], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Todos', null, {})
  }
};
