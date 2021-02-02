const {Todo, User} = require('../models')

function authorize(req, res, next) {
    let UserId = req.headers.UserId
    Todo.findOne({
        where: {UserId}
    })

    .then((todo) => {
        if(todo === null){
            throw {
                name: "customError",
                status: 404,
                message: "Data Not Found"
              }
        }else{
            next()
        }
    })
    .catch(err => {
        res.status(err.status).json(err.message)
    })
}

module.exports = authorize