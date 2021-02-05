const {Todo} = require('../models/index') 

function authorization(req,res,next) { 
    Todo.findOne({ 
        where : { 
            id : +req.params.id
        }}) 
    .then((data) => { 
        if (data === null) { 
            next()
        } else { 
            if (data.UserId === req.decoded.id) { 
                next()
            } else { 
                res.status(401).json({msg : 'Not Authorized'})
            }
        }
    }) 
    .catch((err) => { 
        res.status(500).json(err)
    })
    
} 

module.exports = authorization