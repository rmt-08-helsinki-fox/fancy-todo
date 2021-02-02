const { User } = require('../models')
let {comparePassword} = require('../helpers/bcript')
const user = require('../models/user')
const jwt = require('../helpers/jwt')
const generateToken = require('../helpers/jwt')

class userController {
    static register(req,res) {
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
                console.log(compare)
                if(!comparePassword) throw {mesasage: "Invalid email or password"}
                // minta akses token
                
                const accessToken = generateToken({
                    id: data.id,
                    email: data.email
                })
                res.status(200).json({accessToken})
            })
            .catch(err => {
                const error = err.msg || 'Internal Server Error '
                res.status(500).json({ error})
            })

    }

}
module.exports = userController