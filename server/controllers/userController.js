const {User} = require('../models')
const {compare} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static async register(req, res) {
        try {
            const {
                email,
                password
            } = req.body
            
            const registered = await User.create({email, password}, {returning: true})

            if(!registered) throw({msg: 'Internal server error'})
            res.status(201).json(registered)


        } catch (error) {
            res.status(400).json(error.errors[0].message)
        }
    }

    static async login(req, res) {
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

            const accessToken = generateToken({
                id: selected.id,
                email: selected.email
            })

            res.status(200).json({ accessToken })
            

        } catch (error) {
            error = error.msg || 'Internal server error'
            res.status(500).json({error})
        }
    }
}

module.exports = UserController