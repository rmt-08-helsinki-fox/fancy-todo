const {User} = require('../models')
const {compare} = require('../helpers/bcrypt')

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

            const selected = User.findOne({where: {email}})
            if(!selected) throw({msg: 'Invalid email or password!'})

            const hashedPass = selected.password
            const compare = compare(password, hashedPass)

            if(!compare) throw({msg: 'Invalid email or password!'})

            

        } catch (error) {
            res.status(400).json(error.errors[0].message)
        }
    }
}

module.exports = UserController