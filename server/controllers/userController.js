const { User } = require('../models')
const { checkPass } = require('../helpers/bcrypt')
const { generateToken } =require('../helpers/jsonwebtoken')
// const { checkToken } =require('../middleware/authentication')
const axios = require('axios');

class UserController {
    // login
    // find email
    // compare password
    // jwt sign (npm install jsonwebtoken dulu)
    // jwt.sign(data = {}, secretKey = process.env.SECRETKEY)
    static register(req, res, next) {
        const {email, password} = req.body
        User.create({email, password})
        .then(function(data) {
            res.status(201).json(data)
        }).catch(function(err) {
            // console.log(err);
            // res.status(400).json(err)
            next(err)
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body
        let result
        User.findOne({
            where: {
                email
            }
        }).then(function(user) {
            if (!user) {
                throw { msg: 'Invalid email or password'}
            } 
            const comparePsswrd = checkPass(password, user.password)
            if (!comparePsswrd) {
                throw {msg: 'Invalid email or password'}
            }
            const acess_token = generateToken({
                id: user.id,
                email: user.email
            })
            // res.status(200).json({acess_token})
            // console.log('masuk');
            return axios.get('https://api.adviceslip.com/advice')
        }).then(function(response) {
            res.status(200).json(response.data.slip.advice)
        }).catch(function(err) {
            // const error = err.msg || 'Internal Server Error'
            // res.status(500).json({ error })
            next(err)
        })
    }
}

module.exports = UserController