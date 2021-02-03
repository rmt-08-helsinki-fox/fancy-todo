const {User, Todo} = require('../models')

function authorize(req, res, next){
    Todo.findByPk(req.params.id)
    .then(data=>{
        console.log(req.decoded.id)
        console.log(data.UserId)
        if(req.decoded.id === data.UserId){
            next()
        }else{
            throw err
        }
    })
    .catch(err=>{
        res.status(401).json({
            msg: 'Not Authorized'
        })
    })
}

module.exports = authorize