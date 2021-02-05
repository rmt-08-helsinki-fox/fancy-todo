const {User} = require('../models/index') 
const {comparePassword} = require ('../helpers/bycript') 
const {generateToken} = require ('../helpers/jsonwebtoken')

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
} 

module.exports = UserController