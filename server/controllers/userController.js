const {User} = require('../models/')
const {comparePassword} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt')

class UserController{
    static register(req, res, next){
        User.create(req.body)
        .then((data) => {
            res.status(201).json(data)
        }).catch((err) => {
            console.log(err.errors);
            next(err)
        });
    }

    static login (req, res){
        const {email, password} = req.body

        User.findOne({where:{email}})
        .then((data) => {
            if(!data) throw {msg: 'invalid email or password'}
            const compare = comparePassword(password, data.password)
            if(!compare) throw {msg : 'invalid email or password'}
            const acces_token = generateToken({
                id:data.id,
                email: data.email
            })
            res.status(200).json({acces_token})
        }).catch((err) => {
            const error = err.msg || 'Internal server error'
            res.status(500).json({error})
        });
    }
}

module.exports = UserController

