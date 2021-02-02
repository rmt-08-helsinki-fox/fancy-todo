"use strict"
//@ts-check
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class ToDo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ToDo.belongsTo(models.User, {
                foreignKey: "UserId",
            })
        }
    }
    ToDo.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `Title must not be empty`,
                    },
                    notNull: {
                        msg: `Title is required`,
                    },
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `Description must not be empty`,
                    },
                    notNull: {
                        msg: `Description is required`,
                    },
                },
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                // validate: {
                //     isIn: {
                //         args: [[true, false]],
                //         msg: `Status must be in state of true or false`,
                //     },
                //     notEmpty: {
                //         msg: `Status must not be empty`,
                //     },
                //     notNull: {
                //         msg: `Status is required`,
                //     },
                // },
            },
            due_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    dueDateAfterCreatedAt(value) {
                        if (value <= new Date()) {
                            throw new Error("Due date must not be in the past")
                        }
                    },
                    notNull: {
                        msg: `Due date is required`,
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "ToDo",
        }
    )
    return ToDo
}
