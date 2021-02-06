const { User } = require('../models')
let {comparePassword} = require('../helpers/bcript')
const user = require('../models/user')
const generateToken = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');



class userController {
    static googleLogin(req,res,next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ""
        client.verifyIdToken({
            
            idToken: req.body.googleToken,
            audience:process.env.CLIENT_ID
        })
            .then(ticket =>{
                const payload = ticket.payload
                email = payload.email
                return User.findOne({where: {email}})
            })
            .then(data => {
                if(data){
                    // console.log(data)
                    const token = generateToken({
                        id: data.id,
                        email: data.email
                    })
                    res.status(200).json({ token })
                } else {
                    return User.create({email ,password : process.env.PWD_GOOGLE})
                }
            })
            .then(registeredUser => {
                console.log(registeredUser)
                const token = generateToken({
                    id: registeredUser.id,
                    email: registeredUser.email
                })
                res.status(200).json({token})
            })
            .catch(err => {
                console.log(err)
                // next(err)
            })
    }
    static register(req,res,next) {
        let {email, password} = req.body
        let dataUser = {email, password}
        // console.log(dataUser)
        User.create(dataUser)
            .then(data =>{
                const show = {
                    message: "success register",
                    email : data.email
                }
                res.status(201).json(show)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
                // next(err)
            })

    }
    static login (req,res) {
        //cek user dari req.body email
        let { email, password} = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                // console.log(data)
                if(!data) throw {message: "Invalid email or password"}
                let compare = comparePassword(password, data.password)
                if(!compare) throw {mesasage: "Invalid email or password"}
                // minta akses token
                console.log(`masuk`)
                const accessToken = generateToken({
                    id: data.id,
                    email: data.email
                })
                res.status(200).json({accessToken})
            })
            .catch(err => {
                const error = err.msg || 'Internal Server Error '
                res.status(500).json({ error})
                // next(err)
            })

    }
    // static 

}
module.exports = userController