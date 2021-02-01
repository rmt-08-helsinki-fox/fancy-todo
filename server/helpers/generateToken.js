const jwt = require('jsonwebtoken');
const token = (payload)=>{
        return jwt.sign(payload, 'hacktiv8')
}

module.exports = {token}