"use strict"
const { Model } = require("sequelize")
const { hasPass, comparePass } = require("../helpers/bcrypt")

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `Username must not be empty`,
                    },
                    notNull: {
                        msg: `Username is required`,
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `Password must not be empty`,
                    },
                    notNull: {
                        msg: `Password is required`,
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate: (user, opt) => {
                    user.password = hassPass(user.password)
                },
            },
        }
    )
    return User
}
