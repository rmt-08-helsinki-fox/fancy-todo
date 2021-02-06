const {User} = require('../models/index') 
const {comparePassword} = require ('../helpers/bycript') 
const {generateToken} = require ('../helpers/jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')

class UserController { 
  static register (req,res,next) { 
    const {email,password} = req.body
    const newUser = {email,password}
    User.create(newUser) 
    .then((data) => { 
      const returnedData = { 
        id : data.id, 
        email : data.email
      } 
      res.status(201).json(returnedData)
    }) 
    .catch ((err) => { 
      next(err)
    })
  } 

  static login (req,res,next) { 
    const {email,password} = req.body 
    const loggedUser = {email,password} 
    User.findOne({ 
      where : { 
        email : loggedUser.email
      }
    }) 
    .then((data) => { 
      if (data === null) { 
        throw ({ 
          name : 'LoginError', 
          status : 400,
          msg : 'Invalid email or password' 
        })
      } else  { 
        const comparedPass = comparePassword(loggedUser.password,data.password) 
        if (comparedPass === false) { 
          throw ({ 
            name : 'LoginError', 
            status : 400,
            msg : 'Invalid email or password' 
          })
        } else { 
          const accesToken = generateToken({ 
            id : data.id,
            email : data.email
          }) 
          res.status(200).json({accesToken})
        }
      }
    }) 
    .catch ((err) => { 
      next(err)
    })
  } 

  static googleLogin(req,res,next) { 
    let newMail 
    let newPass = process.env.PASS
    let accesToken
    const client = new OAuth2Client(process.env.CLIENT_ID) 
    client.verifyIdToken({ 
      idToken : req.body.googleToken,
      audience : process.env.CLIENT_ID
    }) 
    .then((ticket) => { 
      const payload = ticket.getPayload() 
      newMail = payload.email
      return User.findOne({ 
        where : { 
          email : newMail
        }
      })
    }) 
    .then((user) => { 
      if(user) { 
        accesToken = generateToken({ 
          id : user.id,
          email : user.email
        }) 
        res.status(200).json({accesToken}) 
      } else {  
        return User.create({ 
          email : newMail,
          password : newPass
        })
      }
    })  
    .then((regUser) => {  
      if (regUser) { 
        accesToken = generateToken({ 
          id : regUser.id,
          email : regUser.email
        }) 
        res.status(201).json({accesToken})
      } 
    })
    .catch((err) => { 
      console.log(err)
    })
  }
} 

module.exports = UserController