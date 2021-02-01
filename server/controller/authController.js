const { User } = require('../models');
const { checkPassword } = require('../helper/hashing');
const { generateToken } = require('../helper/jwt');

class AuthController {
    static async registration(req, res) {
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
            if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
                const validates = err.errors.map(e => e.message);
                const msg = {
                    message: validates,
                    response: false
                }
                res.status(400).json(msg);
            } else {
                res.status(500).json(err);
            };
        }
    }
    static async login(req, res) {
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
            if (err === 'Invalid email or password') {
                const msg = {
                    message: err,
                    response: false
                }
                res.status(401).json(msg);
            } else {
                res.status(500).json(err);
            }
        }
    }
}

module.exports = AuthController;