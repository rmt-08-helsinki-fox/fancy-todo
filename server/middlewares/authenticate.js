const jwt = require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    try {
        const {token} = req.headers
        const decoded = jwt.verify(token, process.env.SECRET);
        req.decoded = decoded
        next()
    } catch(err) {
        // err
        next({
            name:"WrongToken",
            msg:"Invalid Token"
        })
    }
} 

module.exports = authenticate