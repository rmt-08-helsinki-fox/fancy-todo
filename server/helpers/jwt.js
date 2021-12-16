const jwt = require('jsonwebtoken');

function createToken(payload){
    return jwt.sign(payload,process.env.jwt_secret);
}

function verifyToken(payload){
    try{
        let data = jwt.verify(payload, process.env.jwt_secret);
        return data;
    }catch(err){
        return null;
    }
    
}

module.exports = { createToken, verifyToken }