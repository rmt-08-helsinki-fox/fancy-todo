const { User } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')

class UserController {

    static register(req,res,next){
        const { email,password } = req.body
        User.create({email,password})
        .then(user=>{
          res.status(201).json({
            msg : "berhasil register",
            id : user.id,
            email : user.email,
            password : user.password
          })
        }).catch(err=>{
          next(err)
        })
    }

    static login(req,res,next){
      const {email,password} = req.body
      User.findOne({
        where : {
          email
        }
      })
      .then(user=>{
        if(!user) throw { name: "userNotFound", 
        msg : "Invalid Email or Password" }
        const comparePass = comparePassword(password,user.password)
        if(!comparePass) throw { name: "passError",
          msg : "Invalid Email or Password" }
          const access_token = getToken({
          id : user.id,
          email : user.email
        })
        res.status(200).json({access_token})
      })
      .catch(err=>{
        next(err)
      })
    }
}

module.exports = UserController