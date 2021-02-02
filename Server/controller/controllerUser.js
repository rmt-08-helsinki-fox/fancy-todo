const {User} = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const generateToken = require('../helpers/generateToken')

class ControllerUser {
  static register(req,res, next) {
    let {email , password} = req.body
    User.create({email, password})

    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next){
    let {email, password} = req.body
    User.findOne({where: {email}})
    .then(user => {
      if(!user){
        throw {
          name: 'customError',
          status: 400,
          message: 'Email / Password is Invalid'
        }
      }
      let compare = comparePass(password, user.password)
      if(compare){
        let accessToken = generateToken({id: user.id, email: user.email})
        res.status(200).json({accessToken})
      }else{
        throw {
          name: 'customError',
          status: 400,
          message: 'Email / Password is Invalid'
        }
      }
    })
    .catch(err => {
      next(err)
    })
  }


}

module.exports = ControllerUser