const { Todo } = require('../models')

const authorize = function (req, res, next) {

    const todoId = +req.params.id
    console.log(req.currentUser.id, todoId, 'adsffasfa');
    Todo.findByPk(todoId)
        .then(data => {
            if (data.UserId === req.currentUser.id) {
                next()
            } else {
                throw {
                    error: {
                        code: 401,
                        message: 'invalid token'
                    }
                }
            }
        })
        .catch(error => {
            res.status(401).json(error)
        })



}

module.exports = { authorize }