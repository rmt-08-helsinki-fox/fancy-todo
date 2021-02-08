const { User } = require('../models/index.js');
const { comparePassword } = require('../helper/bcrypt.js');
const { generateToken } = require('../helper/jwt.js');
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static register (req, res, next){ 
        const { email, username, password } = req.body
        User.create({email, username, password})
        .then(user => {
          res.status(201).json({
            msg : "register berhasil",
            id : user.id,
            emmail : user.email
          })
        })
        .catch(err => {
          next(err)
        })
    }

    static login (req, res, next) {
      const { email, username, password } = req.body
      User.findOne({where : {email}})
      .then(user => {
        if(!user) throw { name : 'login'}
        const comparedPass = comparePassword(password, user.password)
        if(!comparedPass) throw {name : 'login'}
        const token = generateToken({
          id : user.id,
          email : user.email
        })
        res.status(200).json({ token })
      })
      .catch(err => {
        next(err)
        // const error = err.msg || 'Internal server error'
        // res.status(500).json({ error })
      })
    }

    static googleLogin (req, res, next){
      const client = new OAuth2Client(process.env.CLIENT_ID);
      let email = ""
      let username = ""
      client.verifyIdToken({
        idToken : req.body.googleToken,
        audience : process.env.CLIENT_ID
      })
      .then(ticket => {
        const payload = ticket.getPayload()
        email = payload.email
        username = payload.name
        
        return User.findOne({where : {email}})
      })
      .then(user => {
        if(user){
          //generate token
          const token = generateToken({
            id : user.id,
            email : user.email
          })
          res.status(200).json({ token })
        }else{
          return User.create({
            email,
            username,
            password : process.env.USER_PWD_GOOGLE
          })
        }
      })
      .then(register => {
        const token = generateToken({
          id : register.id,
          email : register.email
        })
        res.status(201).json({ token })
      })
      .catch(err =>{
        console.log(err)
      })
    }

}

module.exports = UserController;