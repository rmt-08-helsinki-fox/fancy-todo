const { verifyToken } = require("../helper/jwt")
const { Todo } = require("../models/index")

const Authentication = (req, res, next) => {
   try {
       const decoded = verifyToken(req.headers.access_token)
       req.userData = decoded
       console.log(decoded)
       next()
   } catch(err) {
       next(err)
   }
}

const Authorization = async (req, res, next) => {
    const idTodo = +req.params.id;
    try {
        const UserId = +req.userData.id;
        const todo = await Todo.findOne({
            where: {
                id: idTodo
            }
        })
        
        if(!todo) {
            throw {name: 'MissingDataError', message: 'data not found'}
        } else if (UserId !== todo.UserId) {
            throw {name: 'UnauthorizedError', message: 'Not Authorized'}
        } else {
            next()
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {
    Authentication,
    Authorization
}

