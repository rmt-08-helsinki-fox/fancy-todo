const { decoded } = require('../helpers/jwt')
const { User } = require('../models')


function authenticate(req, res, next) {
    try {
        let getToken = decoded(req.headers.access_token)
        // console.log(getToken.email);
        User.findOne({
            where: {
                email: getToken.email
            }
        })
        .then(data => {
            if(data) {
                req.user = {
                    id: data.id,
                    email:data.email
                }
                next()
            } else {
                next(req.status(401).json({msg: `User not authorized`}))
            }
            
        })
        .catch(err => next(err))
        // console.log(req.user);
    } catch(err) {
        res.status(400).json({msg: `Invalid Token`})
    }
}

function authorized(req, res, next) {
    
}

module.exports = {
    authenticate,
    authorized
}