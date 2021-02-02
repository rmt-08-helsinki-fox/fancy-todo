const {User} = require('../models/')
const {comparePassword} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt')

class UserController{
    static register(req, res){
        User.create(req.body)
        .then((data) => {
            res.status(201).json(data)
        }).catch((err) => {
            if(err.name === 'SequelizeDatabaseError') res.status(500).json(err)
            else res.status(400).json({error:err.errors[0].message})
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

