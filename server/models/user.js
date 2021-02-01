"use strict"
const { Model } = require("sequelize")
const { hashPass, comparePass } = require("../helpers/bcrypt")

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.ToDo)
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        arg: true,
                        msg: `Invalid email format`,
                    },
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
                    user.password = hashPass(user.password)
                },
            },
        }
    )
    return User
}
