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
                        args: true,
                        msg: `Invalid email format`,
                    },
                    notEmpty: {
                        msg: `Email must not be empty`,
                    },
                    notNull: {
                        msg: `Email is required`,
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                len: {
                    args: [5],
                    msg: `Minimum password length is 5 characters`,
                },
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
