const {User} = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')


class ControllerUser{
    static register(req, res, next){
        const {email, password} = req.body
        User.create({
            email,
            password
        })
        .then(data=>{
            res.status(201).json({
                id: data.id,
                email: data.email
            })
        })
        .catch(err=>{
            err.name = 'Invalid Email'
            next(err)
        })
    }

    static login(req, res, next){
        const {email, password} = req.body

        User.findOne({
            where:{
                email
            }
        })
        .then(user => {
            if(!user) throw {msg: 'Invalid Token'}
            const comparedPass = comparePass(password, user.password)
            // console.log(comparedPass)
            if(!comparedPass) throw {msg: 'Invalid Token'}
          
            const access_token = generateToken({
                id: user.id,
                email: user.email
            })
            
            res.status(200).json({access_token})
        })
        .catch(err=>{
            err.name = err.msg
            // res.status(400).json({error})
            next(err)
        })
    }
}

module.exports = ControllerUser