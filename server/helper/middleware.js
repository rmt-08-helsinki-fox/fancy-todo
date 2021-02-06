const { generateToken, verifyToken } = require('./jwt');
const { User, Todo, Member } = require('../models');

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
        const todo = await Todo.findByPk(id);
        if (!todo) throw 404;
        const user_id = req.decoded.id;
        const member = await Member.findOne({
            where: {
                email: req.decoded.email
            },
            include: Todo
        });
        let isTodoMember = false;
        if (member) {
            member.Todos.forEach(e => {
                if (id == e.id) isTodoMember = true;
                req.member = e;
            });
        }
        if (todo.user_id == user_id || isTodoMember) {
            next();
        } else {
            throw 404
        };
    } catch (err) {
        next(err);
    }
}

module.exports = { mid, checkParamsId };