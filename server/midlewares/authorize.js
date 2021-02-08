const { TodoList} = require('../models/index.js')
const authorize = function(req, res, next){
    TodoList.findByPk(+req.params.id)
    .then(data =>{
        if(req.decoded.id === data.UserId){
            next()
        }else{
            next({name : 'authorized'})
            // res.status(403).json({
            //     message : "youre not authorized"
            // })
        }
    })
    .catch(err => {
        next(err)
        // res.status(500).json({
        //     message : "internal server error"
        // })
    })
}

module.exports = authorize;