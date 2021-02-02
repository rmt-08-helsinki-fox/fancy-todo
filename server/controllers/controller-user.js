const {User} = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class ControllerUser{
    static register(req, res){
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
            const error = err.msg || 'internal Server Error'
            res.status(400).json({error})
        })
    }

    static login(req, res){
        const {email, password} = req.body

        User.findOne({
            where:{
                email
            }
        })
        .then(user => {
            if(!user) throw {msg: 'Invalid Email or Password'}
            const comparedPass = comparePass(password, user.password)
            // console.log(comparedPass)
            if(!comparedPass) throw {msg: 'Invalid email or Password'}
          
            const access_token = generateToken({
                id: user.id,
                email: user.email
            })
            
            res.status(200).json({access_token})
        })
        .catch(err=>{
            const error = err.msg || 'Internal Server Error'
            res.status(400).json({error})
        })
    }
}

module.exports = ControllerUser