const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const token = req.headers.token

    if (!token){
        res.status(401).json({
            message: "Access Denied"
        })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        if (decoded){
            req.user = decoded
        }
        next() 
    }catch (err){
        res.status(401).json({
            message: "Invalid Token"
        })
    }
}


module.exports = authenticate