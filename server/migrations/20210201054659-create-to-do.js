"use strict"
//@ts-check
module.exports = {
    /**
     *
     * @param {import("sequelize").QueryInterface} queryInterface
     * @param {import("sequelize").Sequelize} Sequelize
     */
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("ToDos", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
            },
            due_date: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    /**
     *
     * @param {import("sequelize").QueryInterface} queryInterface
     * @param {import("sequelize").Sequelize} Sequelize
     */
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("ToDos")
    },
}
