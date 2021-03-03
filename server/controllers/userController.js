const {User} = require('../models')
const {compare} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static async register(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body
            
            const registered = await User.create({email, password}, {returning: true})

            if(!registered) throw({msg: 'Internal server error'})
            res.status(201).json(registered)


        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body
            
            const selected = await User.findOne({where: {email}})
            if(!selected) throw({msg: 'Invalid email or password!'})
            
            const hashedPass = selected.password
            const compared = compare(password, hashedPass)

            if(!compared) throw({msg: 'Invalid email or password!'})

            const access_token = generateToken({
                id: selected.id,
                email: selected.email
            })

            res.status(200).json({ access_token })
            

        } catch (error) {
            next(error)
        }
    }

    static googleLogin(req, res, next) {
        console.log("masuk");
        
        const { id_token } = req.body
        let userdata
        const CLIENT_ID = process.env.CLIENT_ID 
        const client = new OAuth2Client(CLIENT_ID);
        client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,  
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            userdata =  {
                email: payload.email,
                password: String(Math.random()*100000000)
            }
            return User.findOne({where: {email: userdata.email}})
        })
        .then(data => {
            if (!data) {
                return User.create(userdata)
            } else {
                return data
            }
        })
        .then(data => {
            let payload = { 
                id: data.id,
                email: data.email 
            } 
            const access_token = generateToken(payload)  
            return res.status(200).json({access_token: access_token})
        })
        .catch( err => {
            next(err)
        })
    }
}

module.exports = UserController