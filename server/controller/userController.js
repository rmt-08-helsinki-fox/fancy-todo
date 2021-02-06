const { User } = require('../models')
const { hash, compare } = require('../helper/bcrypt');
const { generateToken } = require('../helper/jwt');
const { OAuth2Client } = require('google-auth-library')
// const { noExtendLeft } = require('sequelize/types/lib/operators');

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body
        const dataReg = { email, password }
        User.create(dataReg)
            .then(data => {
                console.log(data);
                const message = {
                    message: 'Register Success',
                    id: data.id,
                    email: data.email,
                    password: data.password

                }
                res.status(201).json(message)
            })
            .catch(err => {
                // console.log(err);
                // if (err.name === 'SequelizeValidationError') {
                //     const error = err.errors.map((error)=> error.message)
                // //     res.status(400).json(error)
                // // next(err)
                // } 
                next(err)
                // res.status(500).json(err)
            })

    }
    static login(req, res, next) {
        // res.send('hello') 
        const { email, password } = req.body
        // console.log(req.body);
        User.findOne({ where: { email: email } })
            .then(data => {
                if (compare(password, data.password)) {
                    const accessToken = generateToken({
                        id: data.id,
                        email: data.email
                    })
                    res.status(200).json({ message: 'login success', accessToken })
                } else {
                    throw ({
                        name: 'error login',
                        message: 'Wrong Email and Password'
                    })
                    // res.status(400).json({message:'Wrong email and password'})
                }
            })
            .catch(err => {
                next(err)
                // res.status(500).json(err)
            })
    }
    static googleSignIn(req, res) {
        let dataGoogleUser = {}
        const client = new OAuth2Client(process.env.CLIENT_ID);
        console.log(client);
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                dataGoogleUser.name = payload.name
                dataGoogleUser.email = payload.email
                dataGoogleUser.password = process.env.googlePass
                return User.findOne({
                    where: {
                        email: dataGoogleUser.email
                    }
                })
            })
            .then(data => {
                if (!data) throw data
                const compare = compare(dataGoogleUser.password, data.password)
                if (compare === false) throw compare
                const token = generateToken({
                    id: data.id,
                    email: data.email,
                    password: data.password,
                })
                res.status(201).json({ id: data.id, accessToken: token })
            })
            .catch(err => {
                console.log(err);
                if (err === null) res.status(404).json({ msg: 'Data not found' })
                if (err === false) res.status(400).json({ msg: 'Email/Password is wrong' })
                else res.status(500).json(err)
            })

    }
}

module.exports = UserController