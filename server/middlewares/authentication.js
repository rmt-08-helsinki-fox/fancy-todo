const jwt = require('jsonwebtoken');
const { User } = require('../models/') 

function authenticate(req, res, next) {
    try {
        let decoded = jwt.verify(req.headers.token, process.env.SECRET);
        req.decoded = decoded;
        
        User.findByPk(req.decoded.id)
        .then(user => {
            if(!user) throw ({ name: "customErr", msg: "Not Logged In", status: 401 })
        })
        .catch(err => next(err)); 

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authenticate;