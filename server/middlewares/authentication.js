const jwt = require('jsonwebtoken')

function aunthetication(req,res,next){
    try {
        let {token} = req.headers
        let decoded = jwt.verify(token, process.env.secret);
        req.decoded = decoded
        next()
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = aunthetication