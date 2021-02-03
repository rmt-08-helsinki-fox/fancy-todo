const { decoder } = require("../helpers/jwt")
const { User } = require("../models")

function authenticate (req, res, next) {
    try {
        const access_token = req.headers.access_token;
        const decoded = decoder(access_token)
        
        User.findOne({where:{email:decoded.email}})
            .then (user => {
                if (user){
                    req.decoded = decoded
                    next();
                } else {
                    let error = {name: "invalid token", message: "invalid token"}
                    next(error)
                }
            }).catch(err =>{
                next(err)
            } )
    }
    catch (err) {
        let error = {name: "invalid token", message: "invalid token"}
        next(error)
    }
}

module.exports = authenticate