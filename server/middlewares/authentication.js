const jwt = require('jsonwebtoken');
const { User } = require('../models/') 

async function authenticate(req, res, next) {
    try {
        let decoded = jwt.verify(req.headers.token, process.env.SECRET);
        req.decoded = decoded;
        
        // User.findByPk(req.decoded.id)
        // .then(user => {
        //     if(!user) throw ({ name: "customErr", msg: "Not Logged In", status: 401 })
        // })
        // .catch(err => next(err)); 

        let user = await User.findByPk(req.decoded.id);
        if(!user) throw ({ name: "customErr", msg: "Not Logged In", status: 401 });

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authenticate;