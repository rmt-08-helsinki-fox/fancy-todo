'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProjectUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProjectId: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Projects',
          key: 'id'
        },
        onUpdate : 'Cascade',
        onDelete : 'Cascade'
      },
      UserId: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Users',
          key: 'id'
        },
        onUpdate : 'Cascade',
        onDelete : 'Cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProjectUsers');
  }
};