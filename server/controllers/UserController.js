const {User} = require('../models/index')
const {encrypt, compare} = require('../helper/bcrypt')
const generate = require('../helper/token')

class UserController{

    static register(req,res){
        // console.log("masuik register");
    let {email, password} = req.body
    let newUser = {
        email,
        password
    }
    // console.log(newUser);
    User.create(newUser)
    .then(data=>{
        res.status(201).json({id :data.id, email: data.email})
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json(err)
    })

    }

    
    static login(req,res){
    let {email, password} = req.body
    User.findOne({
        where:{
            email
        }
    })
    .then(data=>{
    let check = compare(password, data.password)
    if(check){
        let user = {
            id: +data.id
        }
        console.log(user);
        let accessToken = generate(user)
        res.status(200).json({accessToken})
    }
    else{
        throw {message: "invalid email or password"}
    }
    })
    .catch((err)=>{
        res.status(400).json(err)
    })
        
    }
}

module.exports = UserController