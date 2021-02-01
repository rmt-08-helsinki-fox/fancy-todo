const { User } = require('../models/');
const { comparePass } = require('../helpers/bcrypt.js');
const { tokenize } = require('../helpers/jwt.js');

class Controller {
    static postRegister(req, res) {
        let { email, password } = req.body;

        User.create({email, password})
        .then(user => res.status(201).json({
            id: user.id,
            email: user.email
        }))
        .catch(err => {
            if(err.name === "SequelizeValidationError"){
                res.status(400).json(err);
            } else if(err.name === "SequelizeUniqueConstraintError"){
                res.status(400).json(err);
            } else {
                res.status(500).json({msg: "Internal server error"});
            }
        });
    }
    static postLogin(req, res) {
        let { email, password } = req.body;

        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(!user) throw ({msg: "Email atau Password salah", status: 400});
            if(!comparePass(password, user.password)) throw ({msg: "Email atau Password salah", status: 400});
            let token = tokenize({
                id: user.id,
                email: user.email
            })
            res.status(200).json({ token })
        })
        .catch(err => {
            if(err.status === 400) {
                res.status(err.status).json({msg: err.msg});
            } else {
                res.status(500).json({msg: "Internal server error"});
            } 
        })
    }
}

module.exports = Controller;