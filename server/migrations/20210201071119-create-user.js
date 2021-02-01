"use strict"
//@ts-check
module.exports = {
    /**
     *
     * @param {import("sequelize").QueryInterface} queryInterface
     * @param {import("sequelize").Sequelize} Sequelize
     */
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("Users")
    },
}
