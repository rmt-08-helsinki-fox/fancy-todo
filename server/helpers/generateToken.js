const jwt = require('jsonwebtoken');
const token = (payload)=>{
        return jwt.sign(payload, process.env.SECRET)
}

module.exports = {token}