const { User } = require('../models');
const { checkPassword } = require('../helper/hashing');
const { generateToken } = require('../helper/jwt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('197969529634-6buqntmaukffr1s1fubr3v1qe45e55bj.apps.googleusercontent.com');

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
    static async oauthGoogleLogin(req, res, next) {
        try {
            const token = req.body.tokenOauth;
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            const email = payload.email;

            let user = await User.findOne({
                where: {
                    email
                }
            });

            if (!user) {
                const newUser = {
                    email,
                    password: payload.sub
                }
                user = await User.create(newUser);
            }

            const userHasLogin = {
                id: user.id,
                email: user.email
            }

            const token_oauth = generateToken(userHasLogin);
            const msg = {
                message: 'Success',
                token: token_oauth,
                response: true
            }
            res.status(200).json(msg);

        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;