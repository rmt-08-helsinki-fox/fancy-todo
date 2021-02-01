const {User} = require('../models')
const{compare} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')



class UserController{

    static postRegister(req,res){
         const {email, password} = req.body

         User.create({email, password})

         .then(user=>{
             res.status(201).json({
               msg: "register success",
               id:user.id,
               email:user.email,
               passsword:user.password

             })
         })
         .catch(err=>{
               const error = err.errors[0].message || "Internal Server Error"
               res.status(500).json(err)
         })
    }


    static postLogin(req,res){
        const {email, password} = req.body

        User.findOne({where: {email}})

        .then(data=>{
            if(data && compare(password, data.password)) {
                let payload = {
                    id: data.id,
                    email: data.email
                }
                const access_token = generateToken(payload)
                res.status(200).json({
                    access_token
                })
            } else {
                
                 res.status(401).json({message: "Invalid email/password"})
            }
        })

        .catch(err=>{

            //console.log('err di line 47')
          const error = err.msg || "internal server error"

          res.status(500).json({error})
        })
    }

}


module.exports = UserController