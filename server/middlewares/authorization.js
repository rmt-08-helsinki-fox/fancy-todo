const { Todo } = require("../models")

function authorize (req,res,next) {
    let requestId = +req.params.id
    let userId = req.decoded.id
    Todo.findOne({where: {id:requestId}})
        .then(todo => {
            if (todo){
                if (todo.UserId === userId){
                    next()
                } else {
                    let error = {name: "not authorized", message: "not authorized"}
                    next(error)
                }
            } else {
                let err = {name: "not found", message: "error, not found"}
                next(err)
            }
        })
        .catch(err => {
            next(err)
          })
}

module.exports = authorize