const { User } = require('../models/');
const { comparePass } = require('../helpers/bcrypt.js');
const { tokenize } = require('../helpers/jwt.js');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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
            if(!user) throw ({name: "customErr",msg: "Email or Password is wrong", status: 400});
            if(!comparePass(password, user.password)) throw ({name: "customErr",msg: "Email or Password is wrong", status: 400});
            let token = tokenize({
                id: user.id,
                email: user.email
            });
            res.status(200).json({ token });
        })
        .catch(err => next(err));
    }
    static loginGoogle(req, res, next) {
        let email;
        
        client.verifyIdToken({
            idToken: req.body.id_token,
            audiance: process.env.CLIENT_ID
        })
        .then(ticket => {
            let payload = ticket.getPayload();
            email = payload.email;
            console.log(email);
            
            return User.findOne({
                where: {
                    email
                }
            })
        })
        .then(user => {
            if(user){
                let token = tokenize({
                    id: user.id,
                    email: user.email
                })

                res.status(200).json({ token });
            } else {
                return User.create({
                    email,
                    password: process.env.PASSWORD
                })
            }
        })
        .then(user => {
            let token = tokenize({
                id: user.id,
                emai: user.email
            })

            res.status(201).json({ token });
        })
        .catch(err => next(err));
    }
}

module.exports = Controller;