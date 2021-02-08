'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.addColumn('Todos','ProjectId',{
        type : Sequelize.INTEGER,
        references : {
          model : 'Projects',
          key : 'id'
        },
        onUpdate : 'Cascade',
        onDelete: 'Cascade'
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
