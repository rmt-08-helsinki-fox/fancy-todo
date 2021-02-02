const { User } = require('../models/');
const { comparePass } = require('../helpers/bcrypt.js');
const { tokenize } = require('../helpers/jwt.js');

class Controller {
    static postRegister(req, res, next) {
        let { email, password } = req.body;

        User.create({email, password})
        .then(user => res.status(201).json({
            id: user.id,
            email: user.email
        }))
        .catch(err => next(err));
    }
    static postLogin(req, res, next) {
        let { email, password } = req.body;

        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(!user) throw ({name: "customErr",msg: "Email atau Password salah", status: 400});
            if(!comparePass(password, user.password)) throw ({name: "customErr",msg: "Email atau Password salah", status: 400});
            let token = tokenize({
                id: user.id,
                email: user.email
            });
            res.status(200).json({ token });
        })
        .catch(err => next(err));
    }
}

module.exports = Controller;