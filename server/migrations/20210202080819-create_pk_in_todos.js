'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('todos', 'user_id', {
      type: Sequelize.INTEGER,
      references : {
        model: 'users'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade' 
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('todos', 'user_id')
  }
};
