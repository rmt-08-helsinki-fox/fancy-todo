"use strict"

module.exports = {
    /**
     *
     * @param {import("sequelize").QueryInterface} queryInterface
     * @param {import("sequelize").Sequelize} Sequelize
     */
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("ToDos", "UserId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    },
    /**
     *
     * @param {import("sequelize").QueryInterface} queryInterface
     * @param {import("sequelize").Sequelize} Sequelize
     */
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("ToDos", "UserId")
    },
}
