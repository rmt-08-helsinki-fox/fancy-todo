const {Todo} = require('../models')

function authorize(req, res, next) {
    let UserId = req.headers.User.id
    Todo.findOne({
        where: {UserId}
    })

    .then((todo) => {
        if(todo === null){
            throw {
                name: "customError",
                status: 401,
                message: "Your not Authorized"
              }
        }else{
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorize