const { User } = require('../models');
const { checkPassword } = require('../helper/hashing');
const { generateToken } = require('../helper/jwt');

class AuthController {
    static async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            const newUser = { email, password }

            const insertUser = await User.create(newUser);
            const data = {
                id: insertUser.id,
                email: insertUser.email,
                createdAt: insertUser.createdAt
            }
            const msg = {
                message: 'Success',
                data,
                response: true
            }
            res.status(201).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const opt = {
                where: {
                    email
                }
            }

            const user = await User.findOne(opt);
            if (!user) throw 'Invalid email or password';
            const isValidPassword = checkPassword(password, user.password);
            if (!isValidPassword) throw 'Invalid email or password';
            const userHasLogin = {
                id: user.id,
                email: user.email
            }
            const token = generateToken(userHasLogin);
            const msg = {
                message: 'Success',
                token,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;