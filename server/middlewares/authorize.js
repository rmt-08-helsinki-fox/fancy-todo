const { Todo } = require('../models')

const authorizeByRole = function(req, res, next){
    const id = req.decoded.id
    try {
        Todo.findOne({where : {
            UserId : id
        }})
        .then(data => {
            next()
        })
    } catch (error) {
        res.status(401).json({
            message: 'Invalid Token'
        })
    }
    
}

module.exports = authorizeByRole