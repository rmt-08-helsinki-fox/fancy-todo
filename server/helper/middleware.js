const { generateToken, verifyToken } = require('./jwt');
const { User, Todo } = require('../models');

const mid = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const verify = verifyToken(token, process.env.SECRET);
        const email = verify.email;
        if (!email) throw 'Invalid token';
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) throw 'Invalid token';
        req.decoded = verify;
        next();
    } catch (err) {
        next(err);
    }
}

const checkParamsId = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const todo = Todo.findByPk(id);
        if (!todo) throw 404;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = { mid, checkParamsId };